import React, { useEffect, useState } from "react";
import Card from "./Card.js";
import NewStory from "./NewStory.js";

import { get } from "../../../utilities";
import { Container } from "react-bootstrap";

const Feed = (props) => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    if (props.currentTopic !== "Timeline") {
      get("/api/stories", { related_topic: props.currentTopic }).then((storyObjs) => {
        let reversedStoryObjs = storyObjs.reverse();
        setStories(reversedStoryObjs);
      });
    } else {
      get("/api/stories").then((storyObjs) => {
        let reversedStoryObjs = storyObjs.reverse();
        setStories(reversedStoryObjs);
      });
    }
  }, [props.currentTopic]);


  let storiesList = <div>No stories!</div>;
  if (stories.length > 0) {
    storiesList = stories.map((storyObj) => (
      <Card
        key={`Card_${storyObj._id}`}
        _id={storyObj._id}
        userId={props.userId}
        isLoggedIn={props.isLoggedIn}
        story_content={storyObj.content}
        story_topic={storyObj.related_topic}
        story_title={storyObj.title}
        story_creator_name={storyObj.creator_name}
        story_creator_id={storyObj.creator_id}
        story_create_time={storyObj.create_time}
        story_lastModified={storyObj.lastModified}
        story_comment_count={storyObj.comment_count}
        handleShowThread={props.handleShowThread}
        storyObj={storyObj}
      />
    ));
  }

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  function handelAddNewStory(storyObj) {
    setStories([storyObj].concat(stories));
  }

  return (
    <div>
      <Container fluid className="text-center">
        <h3><strong>{props.currentTopic}</strong></h3>
      </Container>
      <Container fluid className="mt-5">
        {props.isLoggedIn && !props.banned &&
          <NewStory
            addNewStory={handelAddNewStory}
            currentTopic={props.currentTopic}
            topicsList={props.topicsList}
          />
        }
        {storiesList}
      </Container>
    </div>
  );
}

export default Feed;
