const express = require("express");
const usersViewRouter = express.Router();
const Bloggers = require("../models/blogger");
const ListOfWorks = require("../models/listOfWorks");

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login"); 
}


usersViewRouter.route("/:id")
  .get(isLoggedIn, async (req, res) => {
    var certify = "Certify";
    var likes;
    const id = req.params.id;
    await Bloggers.findById(id)
    .populate("listOfWorks")
    .populate("merchandise")
    .then(blogger => {
      const followers = blogger.followers.length;
      const following = blogger.following.length;
      res.render("blog", { blogger: blogger, followers: followers, certify: certify, following: following, likes: likes});
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
          var likes;
          const followers = blogger.followers.length;
          const following = blogger.following.length;
          res.render("blog", { blogger: blogger, followers: followers, certify: "Certify", following: following, likes: likes });
        } else if (!blogger.followers.includes(req.user._id) || !req.user.following.includes(blogger._id)) {
          blogger.followers.push(req.user._id);
          req.user.following.push(blogger._id);
          blogger.save();
          req.user.save();
          const followers = blogger.followers.length;
          const following = blogger.following.length;
          var likes;
          res.render("blog", { blogger: blogger, followers: followers, certify: "Decertify", following: following, likes: likes });
        } else {
          blogger.followers.pop(req.user._id);
          req.user.following.pop(blogger._id);
          blogger.save();
          req.user.save();
          var likes;
          const followers = blogger.followers.length;
          const following = blogger.following.length;
          res.render("blog", {blogger: blogger, followers: followers, certify: "Certify", following: following, likes: likes })
        }
      }
    })
    .catch(err => console.log(err));
  });

usersViewRouter.route("/:id/:id2")
  .post(async (req, res) => {
    const id = req.params;

    await Bloggers.findById(id.id)
    .populate("listOfWorks")
    .populate("merchandise")
    .then(async blogger => {
      await ListOfWorks.findById(id.id2)
      .then(work => {
        
        if (!work.likes.includes(req.user._id)) {
          const followers = blogger.followers.length;
          const following = blogger.following.length;
          const likes = work.likes.length;
          work.likes.push(req.user._id);
          work.save();
          res.render("blog", {blogger: blogger, followers: followers, certify: "Certify", following: following, likes: likes })
        } else {
          const followers = blogger.followers.length;
          const following = blogger.following.length;
          const likes = work.likes.length;
          work.likes.pop(req.user._id);
          work.save();
          res.render("blog", {blogger: blogger, followers: followers, certify: "Certify", following: following, likes: likes })
        }
      })
    })
    .catch(err => console.log(err));
  })

module.exports = usersViewRouter;
