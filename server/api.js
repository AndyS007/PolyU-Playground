/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server. 
|
*/

const express = require("express");

// import models so we can interact with the database
const Story = require("./models/story");
const Comment = require("./models/comment");
const User = require("./models/user");
const Topic = require("./models/topic");
const Reply = require("./models/reply");
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

router.get("/stories", (req, res) => {
  // empty selector means get all documents
  if (req.query === undefined || req.query.related_topic === 'Timeline') {
    Story.find({})
      .then((stories) => res.send(stories))
      .catch((err) => {
        res.status(401).send({ err });
      });
  } else {
    Story.find(req.query)
      .then((stories) => res.send(stories))
      .catch((err) => {
        res.status(401).send({ err });
      });
  }
});

// delete single story
router.delete("/single-story", (req, res) => {
  Story.findByIdAndDelete(req.query.story_id)
    .then((story) => res.send(story))
    .catch((err) => {
      res.status(401).send({ err });
    });
})

router.get("/thread-story", (req, res) => {
  Story.findById(req.query.storyId)
    .then((story) => {res.send(story)})
    .catch((err) => {
      res.status(401).send({ err });
    });
});

router.post("/story", (req, res) => {
  const newStory = new Story({
    creator_name: req.user.name,
    creator_id: req.user._id,
    create_time: req.body.create_time,
    related_topic: req.body.related_topic,
    content: req.body.content,
    title: req.body.title,
    comment_count: req.body.comment_count,
    last_comment_time: req.body.last_comment_time
  });

  newStory.save()
    .then((story) => res.send(story))
    .catch((err) => {
      res.status(401).send({ err });
    });
});

// update story comment count and last comment time
router.put("/story", (req, res) => {
  if (req.body.updateType === "add") {
    Story.findOneAndUpdate(
      {_id: req.body.story_id},
      {
        $inc: {comment_count: 1}, // increment by 1
        $set: {last_comment_time: new Date()}
      },
      {new: true} // return updated data
    ).then((story) => res.send(story))
      .catch((err) => {
        res.status(401).send({ err });
      });
  } else {
    Story.findOneAndUpdate(
      {_id: req.body.story_id},
      {
        $inc: {comment_count: req.body.updateCount},
      },
      {new: true} // return updated data
    ).then((story) => res.send(story))
      .catch((err) => {
        res.status(401).send({ err });
      });
  }
});

// get comments and sort by time
router.get("/comments", (req, res) => {
  Comment.find(req.query).sort({create_time : -1}).then((comments) => {
    res.send(comments);
  });
});

// get user by user id
router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

// update comment reply count
router.put("/user", (req, res) => {
  if (req.body.type === "isAdministrator") {
    User.findByIdAndUpdate(
      req.body.userId,
      {
        $set: { isAdministrator : req.body.result }
      },{new: true}
    ).then((user) => res.send(user))
      .catch((err) => {
        res.status(401).send({ err });
      });
  } else {
    User.findByIdAndUpdate(
      req.body.userId,
      {
        $set: { banned : req.body.result }
      },{new: true}
    ).then((user) => res.send(user))
      .catch((err) => {
        res.status(401).send({ err });
      });
  }
})

// find all users
router.get("/users", (req, res) => {
  User.find({}).then((users) => {
    res.send(users);
  });
});

// delete single comment
router.delete("/single-comment", (req, res) => {
  Comment.findByIdAndDelete(req.query.comment_id)
    .then((comment) => res.send(comment))
    .catch((err) => {
      res.status(401).send({ err });
    });
})

// delete comments
router.delete("/comments", (req, res) => {
  Comment.deleteMany(req.query)
    .then((comments) => res.send(comments))
    .catch((err) => {
      res.status(401).send({ err });
    });
})

// insert a new comment
router.post("/comment", (req, res) => {
  const newComment = new Comment({
    creator_name: req.user.name,
    creator_id: req.user._id,
    create_time: req.body.create_time,
    last_reply_time: req.body.last_reply_time,
    content: req.body.content,
    parent: req.body.parent,
    reply_count: 0
  });

  newComment.save().then((comment) => res.send(comment));
});

// update comment reply count
router.put("/comment", (req, res) => {
  if (req.body.updateType === "add") {
    Comment.findOneAndUpdate(
      {_id: req.body.comment_id},
      {
        $inc: {reply_count: 1},
        $set: {last_reply_time: new Date()}
      },
      {new: true}
    ).then((comment) => res.send(comment));
  } else {
    Comment.findOneAndUpdate(
      {_id: req.body.comment_id},
      {
        $inc: {reply_count: -1}
      },
      {new: true}
    )
      .then((comment) => res.send(comment))
      .catch((err) => {
        res.status(401).send({ err });
      });
  }
})

// find replies
router.get("/replies", (req, res) => {
  Reply.find(req.query)
    .sort({create_time : -1})
    .then((replies) => {
    res.send(replies);
  });
});

// delete single reply
router.delete("/single-reply", (req, res) => {
  Reply.findByIdAndDelete(req.query.reply_id)
    .then((reply) => res.send(reply))
    .catch((err) => {
      res.status(401).send({ err });
    });
})

// delete replies
router.delete("/replies", (req, res) => {
  Reply.deleteMany(req.query)
    .then((replies) => res.send(replies))
    .catch((err) => {
      res.status(401).send({ err });
    });
})

// post a reply
router.post("/reply", (req, res) => {
  const newReply =  new Reply({
    creator_name: req.user.name,
    creator_id: req.user._id,
    create_time: req.body.create_time,
    comment_id: req.body.comment_id, // links to the _id of a comment
    content: req.body.content,
    to_id: req.body.to_id, // reply to whom, user_id
    to_name: req.body.to_name, // reply to whom, user_name
    story_id: req.body.story_id
  })

  newReply.save().then((reply) => res.send(reply));
})

// find all topics
router.get("/topics", (req, res) => {
  // empty selector means get all documents
  Topic.find({}).then((topics) => res.send(topics));
});

router.delete("/topic", (req, res) => {
  Topic.findOneAndDelete(req.query)
    .then((topic) => res.send(topic))
    .catch((err) => {
    res.status(401).send({ err });
  });
})

// insert a new topic
router.post("/topic", (req, res) => {
  const newTopic = new Topic({
    topic_name: req.body.topic_name,
    description: req.body.description,
  });

  newTopic.save().then((topic) => res.send(topic));
});

// login
router.post("/login", auth.login);

// login out
router.post("/logout", auth.logout);

// find who am I now
router.get("/whoami", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    // user is not logged in
    res.send({});
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
