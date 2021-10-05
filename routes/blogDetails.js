const express = require("express");
const blogDetailsRouter = express.Router();
const listOfWorks = require("../models/listOfWorks");

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login"); 
}

blogDetailsRouter.route("/:id")
    .get(isLoggedIn, async (req, res) => {
        var image;
        const id = req.params.id;
        await listOfWorks.findById(id)
        .then( work => {
            res.render("blogDetails", { work: work })
        })
        .catch( err => console.log(err));
    });

module.exports = blogDetailsRouter;