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

	genre: {
		type: String,
		required: true
	},

	listOfWorks: [{ type: Schema.Types.ObjectId, ref: "LowSchema"}],

	merchandise: [{ type: Schema.Types.ObjectId, ref: "MerchSchema"}],

	followers: [{ type: Schema.Types.ObjectId, ref: "User"}],

	following: [{ type: Schema.Types.ObjectId, ref: "Blogger"}]
});

const Blogger = mongoose.model("Blogger", bloggerSchema);

module.exports = Blogger;
