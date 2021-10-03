const express = require("express");
const dashboardRouter = express.Router();
const Bloggers = require("../models/blogger");

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login"); 
}

dashboardRouter.route("/")
	.get(isLoggedIn, async (req, res) => {
		var work;
		var imageFile;
		await Bloggers.findOne({ _id: req.user._id })
		.populate("listOfWorks")
		.then(list => {
			// console.log(list.listOfWorks)
		res.render("dashboard", { workList: list.listOfWorks, work: work, blogName: list.blogName, imageFile: list.file });
		})
		.catch(err => console.log(err));
	});

dashboardRouter.route('/logout')
	.get((req, res) => {
		req.logout();
		res.redirect('/login');
	});
module.exports = dashboardRouter;
