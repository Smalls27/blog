const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("./listOfWorks");

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

	genre: {
		type: String,
		required: true
	},

	likedBlogs: [{ type: Schema.Types.ObjectId, ref: "LowSchema"}],

	listOfWorks: [{ type: Schema.Types.ObjectId, ref: "Low"}],

	merchandise: [{ type: Schema.Types.ObjectId, ref: "Merchandise"}],

	followers: [{ type: Schema.Types.ObjectId, ref: "User"}],

	following: [{ type: Schema.Types.ObjectId, ref: "Blogger"}]
});

module.exports = mongoose.model("Blogger", bloggerSchema);
