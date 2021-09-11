const express = require("express");
const uploadRouter = express.Router();

uploadRouter.route("/").get((req, res) => {
	res.render("upload");
});

module.exports = uploadRouter;
