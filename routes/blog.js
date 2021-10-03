const express = require("express");
const usersViewRouter = express.Router();
const Bloggers = require("../models/blogger");

usersViewRouter.route("/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    await Bloggers.findById(id)
    .populate("listOfWorks")
    .populate("merchandise")
    .then(blogger => {
      res.render("blog", { blogger: blogger});
    })
  });

module.exports = usersViewRouter;
