const express = require("express");
const dashboardRouter = express.Router();
const ListOfWorks = require("../models/listOfWorks");

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login"); 
}

dashboardRouter.route("/")
	.get(isLoggedIn, async (req, res) => {
		var work;
		const image = await ListOfWorks.find({});
		res.render("dashboard", { images: image, work: work });
	});

dashboardRouter.route('/logout')
	.get((req, res) => {
		req.logout();
		res.redirect('/login');
	});
module.exports = dashboardRouter;
