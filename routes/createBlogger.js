const express = require("express");
const createBlogRouter = express.Router();
const bcrypt = require("bcrypt");
const Bloggers = require("../models/blogger");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/blogImages/")
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage});

createBlogRouter.route("/")
    .get((req, res) => {
        res.render("createBlogger");
    })
    .post(upload.single("image"), async (req, res) => {
        const salted = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, salted);
        const newBlogger = {
            username: req.body.username,
            password: hashedPassword,
            blogName: req.body.blogName,
            genre: req.body.genre,
            file: `blogImages/${req.file.originalname}`,
            img: {
				fieldname: req.file.fieldname,
				originalname: req.file.originalname,
				encoding: req.file.encoding,
				mimetype: req.file.mimetype,
				destination: req.file.destination + req.file.originalname,
				filename: req.file.filename,
				path: req.file.path,
				size: req.file.size
			}
        }

        Bloggers.create(newBlogger)
        .then(blogger => {
            res.render("login");
        })
        .catch(err => console.log(err));
    });


module.exports = createBlogRouter;