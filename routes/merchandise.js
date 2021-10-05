const express = require("express");
const merchRouter = express.Router();
const Merchandises = require("../models/merchandise");
const Bloggers = require("../models/blogger");

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login"); 
}

merchRouter.route("/")
  .get(isLoggedIn, async (req, res) => {
    const blogger = await Bloggers.findOne({ _id: req.user._id })
    .populate("merchandise")
    .then(merchList => {
      res.render("merchandise", { merchandises: merchList.merchandise, blogName: merchList.blogName, imageFile: merchList.file });
    })
  });

module.exports = merchRouter;
