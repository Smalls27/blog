const express = require("express");
const detailsRouter = express.Router();
const Merchandise = require("../models/merchandise");

detailsRouter.route("/:id")
    .get(async (req, res) => {
        const id = req.params.id;

        await Merchandise.findById(id)
        .then( merch => {
            res.render("merchdetails", { product: merch });
        })
    });

module.exports = detailsRouter; 