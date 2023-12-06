const mongoose = require("mongoose");

//define a reply schema for the database
const ReplySchema = new mongoose.Schema({
  creator_name: String,
  creator_id: String,
  create_time: Date,
  comment_id: String, // links to the _id of a comment
  content: String,
  to_id: String, // reply to whom, user_id
  to_name: String, // reply to whom, user_name
  story_id: String,
});

// compile model from schema
module.exports = mongoose.model("reply", ReplySchema);