const express = require("express");
const router = express.Router();
const Bloggers = require("../models/blogger");

/* GET home page. */
router.route("/")
  .get(async (req, res) => {
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
