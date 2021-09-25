const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloggerSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},

	password: {
		type: String,
		required: true,
		unique: true
	},
	
	blogName: {
		type: String,
		required: true
	},

	listOfWorks: {
		type: Array,
		default: [],
	},

	merchandise: {
		type: Array,
		default: [],
	},

	followers: {
		type: Array,
		default: []
	},
	following: {
		type: Array,
		default: []
	}
});

module.exports = bloggerSchema;
