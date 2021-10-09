const express = require("express");
const usersViewRouter = express.Router();
const Bloggers = require("../models/blogger");

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login"); 
}


usersViewRouter.route("/:id")
  .get(isLoggedIn, async (req, res) => {
    var certify = "Certify";
    const id = req.params.id;
    await Bloggers.findById(id)
    .populate("listOfWorks")
    .populate("merchandise")
    .then(blogger => {
      const followers = blogger.followers.length;
      const following = blogger.following.length;
      res.render("blog", { blogger: blogger, followers: followers, certify: certify, following: following});
    })
    .catch(err => console.log(err));
  })
  .post(async (req, res) => {
    const id = req.params.id
    await Bloggers.findById(id)
    .populate("listOfWorks")
    .populate("merchandise")
    .then(blogger => {
  
      if (req.user) {
        if (req.user.username === blogger.username) {
          const followers = blogger.followers.length;
          const following = blogger.following.length;
          res.render("blog", { blogger: blogger, followers: followers, certify: "Certify", following: following });
        } else if (!blogger.followers.includes(req.user._id) || !req.user.following.includes(blogger._id)) {
          blogger.followers.push(req.user._id);
          req.user.following.push(blogger._id);
          blogger.save();
          req.user.save();
          const followers = blogger.followers.length;
          const following = blogger.following.length;
          res.render("blog", { blogger: blogger, followers: followers, certify: "Decertify", following: following });
        } else {
          blogger.followers.pop(req.user._id);
          req.user.following.pop(blogger._id);
          blogger.save();
          req.user.save();
          const followers = blogger.followers.length;
          const following = blogger.following.length;
          res.render("blog", {blogger: blogger, followers: followers, certify: "Certify", following: following })
        }
      }
    })
    .catch(err => console.log(err));
  })

module.exports = usersViewRouter;
