const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            min: 10,
            max: 300,
        },
        description: {
            type: String,
            required: true,
            min: 10,
        },
        body: {
            type: String,
            required: true,
            min: 10,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("posts", PostSchema);
