const router = require("express").Router();
const { newPostValidation } = require("../services/validations");
const Post = require("../models/Post");
const User = require("../models/User");
const verifyToken = require("../services/verifyToken");
const jwt = require("jsonwebtoken");

// CREATING A NEW POST
router.post("/new-post", verifyToken, async (req, res) => {
    // checking for errors
    const { error } = newPostValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { userId } = jwt.decode(
        req.header("Authorization"),
        process.env.TOKEN_SECRET
    );

    const newPost = new Post({
        title: req.body.title,
        description: req.body.description,
        body: req.body.body,
        userId: userId,
    });

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// RETRIEVING BLOG POSTS FROM A USER
router.get("/:username", async (req, res) => {
    const username = req.params.username;

    //checking if user exists
    const user = await User.findOne({ username: username });
    if (!user) return res.status(400).json("User not found!");

    //searching for posts
    const posts = await Post.find({ userId: user._id });
    res.json(posts);
});

module.exports = router;
