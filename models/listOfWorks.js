const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lowSchema = new Schema({
	img: {
		data: Buffer,
		contentType: String,
	},
});

const LowSchema = mongoose.model("Low", lowSchema);

module.exports = LowSchema;
