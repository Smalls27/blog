const express = require("express");
const loginRouter = express.Router();
const passport = require("passport");
const Bloggers = require("../models/blogger");

const isLoggedOut = (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    res.redirect("/dashboard"); 
}

loginRouter.route("/")
    .get(isLoggedOut, (req, res) => {
        res.render("login");
    })
    .post(passport.authenticate('local', {successRedirect: '/dashboard', failureRedirect: '/login'}), (req, res) => {
        const login = {
            username: req.body.username,
            password: req.body.password
        }

        Bloggers.findOne({ username: login.username})
        .then(blogger => {
            if (!blogger) {
                res.send("There isn't an account that exist with those credentials.")
            } else if (login.password === '' || login.password !== user.password) {
                res.send("The password that you entered is incorrect.")
            }

            res.render("dashboard", {blogger: blogger});
        })
        .catch(err => console.log(err));
    })

module.exports = loginRouter;