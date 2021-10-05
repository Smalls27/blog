const express = require("express");
const usersViewRouter = express.Router();
const Bloggers = require("../models/blogger");

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login"); 
}


usersViewRouter.route("/:id")
  .get(isLoggedIn, async (req, res) => {
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
      const certify = "Certify"
      if (req.user !== undefined) {
        if (blogger.followers.includes(req.user._id)) {
          const followers = blogger.followers.length;
          res.render("blog", { blogger: blogger, followers: followers, certify: certify});
        } else {
          blogger.followers.push(req.user._id);
          blogger.save();
          const followers = blogger.followers.length;
          res.render("blog", { blogger: blogger, followers: followers, certify: "Certified"});
        }
      }
    })
    .catch(err => console.log(err));
  })

module.exports = usersViewRouter;
