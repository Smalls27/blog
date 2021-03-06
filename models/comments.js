const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: {
        type: String
    },

    postedby: {
        type: Schema.Types.ObjectId,
        ref: "Blogger"
    },

    likes: [{ type: Schema.Types.ObjectId, ref: "Blogger"}],

    replies: [{ type: Schema.Types.ObjectId, ref: "Reply"}],

    date: {
        type: String
    }
});

const Comments = mongoose.model("Comment", commentSchema);

module.exports = Comments;