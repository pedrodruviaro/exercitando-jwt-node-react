const router = require("express").Router();
const {
    registerValidtion,
    loginValidation,
} = require("../services/validations");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// REGISTER ROUTE
router.post("/register", async (req, res) => {
    // validating
    const { error } = registerValidtion(req.body);
    if (error) {
        return res.status(401).json(error.details[0].message);
    }

    // encrypting password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
    });

    try {
        const savedUser = await user.save();
        const { password, ...rest } = savedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        res.status(500).json(error);
    }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
    // validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(401).json(error.details[0].message);

    // checking if there is a user
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json("Wrong Credentials!");

    // checking password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json("Wrong Credentials!");

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);

    const { password, ...rest } = user._doc;
    res.header("Authorization", token).json({ ...rest, token });
});

module.exports = router;
