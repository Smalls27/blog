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
      const followers = blogger.followers.length;
      res.render("blog", { blogger: blogger, followers: followers});
    })
    .catch(err => console.log(err));
  })
  .post(async (req, res) => {
    const id = req.params.id
    await Bloggers.findById(id)
    .then(blogger => {
      if (blogger._id === req.user._id || blogger.followers.includes(req.user._id)) {
        const followers = blogger.followers.length;
        res.render("blog", { blogger: blogger, followers: followers});
      } else {
        blogger.followers.push(req.user._id);
        blogger.save();
        const followers = blogger.followers.length;
        res.render("blog", { blogger: blogger, followers: followers});
      }
    })
  })

module.exports = usersViewRouter;
