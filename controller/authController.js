const config = require("config");
const User = require("../models/User");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
        const { username, firstname, lastname, password } = req.body;

        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(409).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username: username,
            firstname: firstname,
            lastname: lastname,
            password: hashedPassword,
            role: "DOCTOR",
        });

        await user.save();

        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = jwt.sign(
            { userId: user.id },
            config.get("ACCESS_TOKEN_SECRET"),
            { expiresIn: "7d" }
        );
        const refreshToken = jwt.sign(
            { userId: user.id },
            config.get("REFRESH_TOKEN_SECRET")
        );

        user.refreshTokens.push({ token: refreshToken });
        await user.save();

        res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const refreshToken = async (req, res) => {
    try {
        const { refreshToken: refreshTokenValue } = req.body;

        if (!refreshTokenValue) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findOne({
            "refreshTokens.token": refreshTokenValue,
        });

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const accessToken = jwt.sign(
            { userId: user.id },
            config.get("ACCESS_TOKEN_SECRET"),
            { expiresIn: "2d" }
        );

        res.json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    register,
    login,
    refreshToken,
};
