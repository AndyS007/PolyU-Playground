const mongoose = require("mongoose");

//define a topic schema for the database
const TopicSchema = new mongoose.Schema({
  topic_name: String,
  description: String,
});

// compile model from schema
module.exports = mongoose.model("topic", TopicSchema);