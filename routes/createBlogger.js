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
        res.render("createBlogger", { errMessage: " " });
    })
    .post(upload.single("image"), async (req, res) => {
        const salted = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, salted);
        const newBlogger = {
            username: req.body.username,
            password: hashedPassword,
            blogName: req.body.blogName,
            genre: req.body.genre,
            file: `/blogImages/${req.file.originalname}`,
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

        await Bloggers.findOne({ username: req.body.username })
        .then(blogger => {
            if (blogger) {
                if (blogger.username === req.body.username) {
                    res.render("createBlogger", { errMessage: "Username attached to an account that already exists."});
                } 
            } else {
                Bloggers.create(newBlogger)
                .then(blogger => {
                    res.render("login");
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
    });


module.exports = createBlogRouter;