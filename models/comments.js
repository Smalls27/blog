const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: {
        type: String
    },

    postedby: {
        type: Schema.Types.ObjectId,
        ref: "Blogger"
    }
});

const Comments = mongoose.model("Comment", commentSchema);

module.exports = Comments;