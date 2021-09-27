const express = require("express");
const createMerchRouter = express.Router();
const Merchandises = require("../models/merchandise");
const Images = require("../models/listOfWorks");
const multer = require("multer");

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login"); 
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/merchImage/");
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

createMerchRouter.route("/")
    .get(isLoggedIn, (req, res) => {
        var errMessage;
        res.render("createMerch", { err: errMessage });
    })
    .post(upload.single("merchImage"), (req, res) => {
        console.log(req.file);
        const merchandise = {
            nameOfMerch: req.body.merchName,
            file: `merchImage/${req.file.filename}`,

            img: {
		        fieldname: req.file.fieldname,
		        originalname: req.file.originalname,
		        encoding: req.file.encoding,
		        mimetype: req.file.mimetype,
		        destination: req.file.destination,
		        filename: req.file.filename,
		        path: req.file.path,
		        size: req.file.size
            },

            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description
        };

        Merchandises.create(merchandise)
        .then(async merchandise => {
            if (merchandise) {
                const image = await Images.find({});
                res.render("dashboard", { images: image});
            } else {
                const errMessage = "Something went wrong...";
                res.render("createMerch", { err: errMessage });
            }
        })
        .catch(err => console.log(err));
    });

createMerchRouter.route('/logout')
	.get((req, res) => {
		req.logout();
		res.redirect('/login');
	});

module.exports = createMerchRouter;