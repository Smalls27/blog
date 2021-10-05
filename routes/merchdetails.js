const express = require("express");
const detailsRouter = express.Router();
const Merchandise = require("../models/merchandise");
const Bloggers = require("../models/blogger");

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login"); 
}

detailsRouter.route("/:id")
    .get(isLoggedIn, async (req, res) => {
        const id = req.params.id;

        await Merchandise.findById(id)
        .then( merch => {
            res.render("merchdetails", { product: merch });
        })
    });

module.exports = detailsRouter; 