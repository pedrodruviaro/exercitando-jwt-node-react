const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    console.log(req.headers);

    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Access Denied!" });
    }

    try {
        const tokenData = jwt.verify(token, process.env.TOKEN_SECRET);

        req.user = tokenData;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token!" });
    }
};
