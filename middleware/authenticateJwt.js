const config = require("config");
const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, config.get("ACCESS_TOKEN_SECRET"), (err, decoded) => {
            if (err) {
                return res.sendStatus(401);
            }

            req.user = decoded;
            next();
        });
    } else {
        res.sendStatus(401).json({ message: "pnh" });
    }
};

module.exports = authenticateJWT;
