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
		.populate("followers")
		.then(blogger => {
			res.render("dashboard", {
				blogger: blogger, 
				workList: blogger.listOfWorks, 
				work: work, 
				blogName: blogger.blogName, 
				imageFile: blogger.file });
		})
		.catch(err => console.log(err));
	})
	.post(async (req, res) => {
		await Bloggers.findOne({ id: req.user.id})
		.populate("followers")
		.then(bloggers => {

		})
	})

dashboardRouter.route('/logout')
	.get((req, res) => {
		req.logout();
		res.redirect('/login');
	});
module.exports = dashboardRouter;
