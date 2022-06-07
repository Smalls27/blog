const express = require("express");
const dashboardRouter = express.Router();
const Bloggers = require("../models/blogger");
const Messages = require("../models/messages");
const dateFormats = require("../dateFormat");

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login"); 
}

dashboardRouter.route("/")
	.get(isLoggedIn, async (req, res) => {
		var work;
		await Bloggers.findById(req.user._id)
		.populate("listOfWorks")
		.populate("followers")
		.populate({ path: "messages", populate: { path: "recipient"}})
		.then(blogger => {
			res.render("dashboard", {
				blogger: blogger, 
				workList: blogger.listOfWorks, 
				work: work, 
				blogName: blogger.blogName, 
				imageFile: blogger.file,
				messages: blogger.messages 
			});
		})
		.catch(err => console.log(err));
	})
	.post(async (req, res) => {
		await Bloggers.findOne({ blogName: req.body.recipient })
		.then(async blogger => {
			const message = {
				messenger: req.user.blogName,
				recipient: blogger._id,
				date: `${dateFormats.month()} ${dateFormats.dayOfMonth()}, ${dateFormats.year()} | ${dateFormats.time()}`,
				message: req.body.message
			}
			
			await Messages.create(message)
			.then(message => {
				req.user.messages.push(message._id);
				blogger.messages.push(message._id);
				req.user.save();
				blogger.save();
				res.redirect("/dashboard");
			})
		})
		.catch(err => console.log(err));
	});

dashboardRouter.route("/:id/removeMessage")
	.post(async (req, res) => {
		const id = req.params.id;

		await Messages.deleteOne({ _id: id })
		.then(message => {
			req.user.messages.pop(message);
			req.user.save();
			res.redirect(`/dashboard/${req.user._id}/messages`);
		})
		.catch(err => console.log(err));
	})

dashboardRouter.route("/:id/messages")
	.get(async (req, res) => {
		const id = req.params.id;

		await Bloggers.findById(id)
		.populate("messages")
		.then(blogger => {
			res.render("messages", {
				blogger: blogger,
				messages: blogger.messages
			})
		})
		.catch(err => console.log(err))
	})

dashboardRouter.route('/logout')
	.get((req, res) => {
		req.logout();
		res.redirect('/login');
	});
module.exports = dashboardRouter;
