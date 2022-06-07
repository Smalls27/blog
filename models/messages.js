const mongoose = require("mongoose");
const Schema = mongoose.Schema;

messageSchema = new Schema({
    messenger: String,
    recipient: { type: Schema.Types.ObjectId, ref: "Blogger" },
    date: String,
    message: String
});

const Messages = mongoose.model("Message", messageSchema);

module.exports = Messages;