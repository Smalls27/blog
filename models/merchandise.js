const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const merchandiseSchema = new Schema({
    nameOfMerch: {
        type: String,
        required: true
    },

    file: String,

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

    price: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
    },

    description: {
        type: String
    }
});

const MerchSchema = mongoose.model("Merchandise", merchandiseSchema);

module.exports = MerchSchema;