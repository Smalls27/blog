const express = require("express");
const bloggersRouter = express.Router();

bloggersRouter.route("/")
    .get((req, res) => {
        res.render("bloggerProfile");
    })

module.exports = bloggersRouter;