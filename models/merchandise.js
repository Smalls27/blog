const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const merchandiseSchema = new Schema({
    nameOfMerch: {
        type: String,
        required: true
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

    price: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
    }
});

const MerchSchema = mongoose.model("Merchandise", merchandiseSchema);

module.exports = MerchSchema;