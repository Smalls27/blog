const express = require("express");
const usersViewRouter = express.Router();

usersViewRouter.route("/:id").get((req, res) => {
  res.render("usersViewOfBlog");
});

module.exports = usersViewRouter;
