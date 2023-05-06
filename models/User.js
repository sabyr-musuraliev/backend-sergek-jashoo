const { Schema, model } = require("mongoose");

const User = new Schema({
    username: { type: String, required: true, unique: true, index: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    role: { type: String },
    refreshTokens: [
        {
            token: {
                type: String,
            },
        },
    ],
});

module.exports = model("User", User);
