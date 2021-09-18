const express = require("express");
const dashboardRouter = express.Router();
const Images = require("../models/listOfWorks");

dashboardRouter.route("/").get(async (req, res) => {
	const image = await Images.find({});
	res.render("dashboard", { images: image });
});

module.exports = dashboardRouter;
