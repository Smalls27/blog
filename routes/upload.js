const express = require("express");
const uploadRouter = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const listOfWorks = require("../models/listOfWorks");

const date = new Date();
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/images/");
	},

	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

uploadRouter
	.route("/")
	.get((req, res) => {
		res.render("upload");
	})
	.post(upload.single("bloggerImage"), (req, res) => {
		console.log(req.file);
		const bloggerImage = {
			title: req.body.blogTitle,
			img: {
				file: `images/${req.file.originalname}`,
				fieldname: req.file.fieldname,
				originalname: req.file.originalname,
				encoding: req.file.encoding,
				mimetype: req.file.mimetype,
				destination: req.file.destination + req.file.originalname,
				filename: req.file.filename,
				path: req.file.path,
				size: req.file.size,
			},
		};

		listOfWorks.create(bloggerImage)
		.then((image) => {
			if (image) {
				res.redirect("/");
			} else {
				console.log("image does not exist...");
			}
		})
		.catch((err) => console.log(err));
	});

module.exports = uploadRouter;
