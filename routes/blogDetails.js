const express = require("express");
const blogDetailsRouter = express.Router();
const listOfWorks = require("../models/listOfWorks");

blogDetailsRouter.route("/:id")
    .get(async (req, res) => {
        var image;
        const id = req.params.id;
        await listOfWorks.findById(id)
        .then( work => {
            res.render("blogDetails", { work: work })
        })
        .catch( err => console.log(err));
    });

module.exports = blogDetailsRouter;