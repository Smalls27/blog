const express = require("express");
const merchRouter = express.Router();
const Merchandises = require("../models/merchandise");
const Bloggers = require("../models/blogger");

merchRouter.route("/")
  .get(async (req, res) => {
    const blogger = await Bloggers.findOne({ _id: req.user._id })
    .populate("merchandise")
    .then(merchList => {
      res.render("merchandise", { merchandises: merchList.merchandise, blogName: merchList.blogName, imageFile: merchList.file });
    })
  });

module.exports = merchRouter;
