const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lowSchema = new Schema({
	title: {
		type: String
	},

	file: {
		type: String
	},

	img: {
		fieldname: String,
		originalname: String,
		encoding: String,
		mimetype: String,
		destination: String,
		filename: String,
		path: String,
		size: Number
	},

	content: {
		type: String
	},

	author: {
		type: String
	},

	likes: [{ type: Schema.Types.ObjectId, ref: "Blogger" }],

	dislikes: [{ type: Schema.Types.ObjectId, ref: "Blogger" }],

	comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],

	replies: [{ type: Schema.Types.ObjectId, ref: "Reply"}],

	date: {
		type: String
	}

}, { timestamps: true });

const LowSchema = mongoose.model("Low", lowSchema);

module.exports = LowSchema;
