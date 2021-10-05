const express = require("express");
const router = express.Router();
const Bloggers = require("../models/blogger");

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login"); 
}

router.route("/")
  .get(isLoggedIn, async (req, res) => {
    const searchList = [];
    res.render("index", { searchItems: searchList, searchErr: " "});
  })
  .post(async (req, res) => {
    
    await Bloggers.find({})
    .then(bloggers => {
      const searchList = bloggers.filter(blogger => blogger.blogName.toLowerCase().includes(req.body.search.toLowerCase()))
      res.render("index", { searchItems: searchList });
    })
    .catch(err => console.log(err));
    
  });

module.exports = router;
