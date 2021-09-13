const express = require("express");
const uploadRouter = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const listOfWorks = require("../models/listOfWorks");

const date = new Date();
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "imageUploads");
	},

	filename: (req, file, cb) => {
		cb(null, file.originalname + "-" + date.toDateString());
	},
});

const upload = multer({ storage: storage });

uploadRouter
	.route("/")
	.get((req, res) => {
		res.render("upload");
	})
	.post(upload.single("bloggerImage"), (req, res) => {
		const bloggerImage = {
			img: {
				data: fs.readFileSync(path.join("C:/Users/Owner/Desktop/BlogHostingWebsite/blogSearch/imageUploads/" + req.file.filename)),
				contentType: "bloggerImage/jpg",
			},
		};

		listOfWorks
			.create(bloggerImage)
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
