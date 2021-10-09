const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

mongoose
    .connect(uri)
    .then(() =>
        app.listen(port, () => console.log(`Server running on port ${port}`))
    )
    .catch((err) => console.error(err));

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
