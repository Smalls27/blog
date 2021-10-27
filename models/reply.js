const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
    text: {
        type: String
    },

    posted: {
        type: Schema.Types.ObjectId,
        ref: "Blogger"
    },

    likes: [{ type: Schema.Types.ObjectId, ref: "Blogger"}],

    date: {
        type: String
    }
})

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;