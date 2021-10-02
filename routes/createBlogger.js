const express = require("express");
const createBlogRouter = express.Router();
const bcrypt = require("bcrypt");
const Bloggers = require("../models/blogger");

createBlogRouter.route("/")
    .get((req, res) => {
        res.render("createBlogger");
    })
    .post(async (req, res) => {
        const salted = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, salted);
        const newBlogger = {
            username: req.body.username,
            password: hashedPassword,
            blogName: req.body.blogName,
            genre: req.body.genre
        }

        Bloggers.create(newBlogger)
        .then(blogger => {
            res.render("login");
        })
        .catch(err => console.log(err));
    });


module.exports = createBlogRouter;