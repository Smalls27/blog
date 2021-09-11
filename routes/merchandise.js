const express = require("express");
const merchRouter = express.Router();

merchRouter.route("/").get((req, res) => {
  res.render("merchandise");
});

module.exports = merchRouter;
