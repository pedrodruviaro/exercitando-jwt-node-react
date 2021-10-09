const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            min: 6,
            max: 100,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            min: 6,
            max: 200,
        },
        password: {
            type: String,
            unique: false,
            required: true,
            min: 6,
            max: 1000,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
