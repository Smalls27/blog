const express = require("express");
const merchRouter = express.Router();
const Merchandises = require("../models/merchandise");

merchRouter.route("/")
  .get(async (req, res) => {
    const merch = await Merchandises.find({});
    res.render("merchandise", { merchandises: merch});
  });

module.exports = merchRouter;
