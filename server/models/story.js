const mongoose = require("mongoose");

//define a story schema for the database
const StorySchema = new mongoose.Schema({
  creator_name: String,
  creator_id: String,
  create_time: Date,
  related_topic: String, // links to the topic_name of a related topic
  title: String,
  content: String,
  comment_count: Number,
  last_comment_time: Date,
});

// compile model from schema
module.exports = mongoose.model("story", StorySchema);
