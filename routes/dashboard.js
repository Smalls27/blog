const express = require("express");
const dashboardRouter = express.Router();
const ListOfWorks = require("../models/listOfWorks");

dashboardRouter.route("/")
	.get(async (req, res) => {
		var work;
		const image = await ListOfWorks.find({});
		res.render("dashboard", { images: image, work: work });
	});

module.exports = dashboardRouter;
