const express = require("express");
const uploadRouter = express.Router();
const multer = require("multer");
const listOfWorks = require("../models/listOfWorks");
const Bloggers = require("../models/blogger");

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login"); 
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/images/");
	},

	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

uploadRouter.route("/")
	.get(isLoggedIn, (req, res) => {
		res.render("upload");
	})
	.post(upload.single("bloggerImage"), (req, res) => {
		const bloggerImage = {
			title: req.body.blogTitle,
			file: `/images/${req.file.originalname}`,

			img: {
				fieldname: req.file.fieldname,
				originalname: req.file.originalname,
				encoding: req.file.encoding,
				mimetype: req.file.mimetype,
				destination: req.file.destination + req.file.originalname,
				filename: req.file.filename,
				path: req.file.path,
				size: req.file.size
			},

			content: req.body.content,
			author: req.body.author
		};

		listOfWorks.create(bloggerImage)
		.then(async work => {
			if (work) {
				const blogger = await Bloggers.findOne({ _id: req.user._id });
				const workListItem = await listOfWorks.findOne({ _id: work._id });
				blogger.listOfWorks.push(workListItem);
				await blogger.save();
				res.redirect("/dashboard");
			} else {
				console.log("image does not exist...");
			}
		})
		.catch((err) => console.log(err));
	});

uploadRouter.route("/logout")
	.get((req, res) => {
		req.logOut();
		res.redirect("/login");
	});

module.exports = uploadRouter;
