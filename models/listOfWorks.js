const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lofSchema = new Schema({
	genre: {
		type: String,
		required: true,
	},
});
