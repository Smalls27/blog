const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloggerSchema = new Schema({
	listOfWorks: {
		type: Array,
		default: [],
	},

	merchandise: {
		type: Array,
		default: [],
	},
});
