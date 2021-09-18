const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lowSchema = new Schema({
	title: {
		type: String
	},
	img: {
		file: String,
		fieldname: String,
		originalname: String,
		encoding: String,
		mimetype: String,
		destination: String,
		filename: String,
		path: String,
		size: Number
	},
});

const LowSchema = mongoose.model("Low", lowSchema);

module.exports = LowSchema;
