import React, { useEffect, useState } from "react";
import { post } from "../../../utilities";

import "../../../styles/NewPostInput.css";
import "../../../styles/NewStory.css"
import { Container, DropdownButton, InputGroup } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';


const NewStory = (props) => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [topic, setTopic] = useState("");

  useEffect(() => {
    if (props.currentTopic !== "Timeline") {
      setTopic(props.currentTopic);
    }
  })

  let topicList = null;
  if (props.topicsList.length > 0) {
    topicList = props.topicsList.map( (topic) => (
      <Dropdown.Item
        key={`Topic_${topic._id}`}
        _id={topic._id}
        style={{background : "white"}}
        className="topic-dropdown-item"
      >
        <Button
          variant="light"
          value={topic.topic_name.toString()}
          onClick={handleTopicChange}
          className="topic-dropdown-button"
        >
          {topic.topic_name.toString()}
        </Button>
      </Dropdown.Item>
    ))
  }

  // add a new story , save to mongodb
  function addStory(value, title, topic) {
    const body = {
      content: value,
      related_topic: topic,
      create_time: new Date(),
      title: title,
      comment_count: 0,
      last_comment_time: new Date()
    };
    post("/api/story", body).then((story) => {
      // display this story on the screen
      props.addNewStory(story);
    });
  }

  // called whenever the user types in the new post input box
  function handleContentChange(event) {
    setValue(event.target.value);
  }

  // called whenever the user types in the title input
  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  // called whenever the user selects a topic to post stories
  function handleTopicChange(event) {
    setTopic(event.target.value);
  }

  // called when the user hits "Submit" for a new post
  function handleSubmit(event) {
    const STORY_LENGTH_LIMITATION = 4096;
    // if the content is empty, should prompt user to write something
    if (title === "") {
      alert("The title content is empty!");
    } else if (value === "") {
      alert("The story content is empty!");
    } else if (value.length > STORY_LENGTH_LIMITATION) {
      alert("Story length should not exceed " + STORY_LENGTH_LIMITATION + " bytes!");
    }  else {
      event.preventDefault();
      const currentTopic = topic === "" ? props.currentTopic : topic;
      if (currentTopic === "Timeline") {
        alert("Please select a topic!");
        return;
      }
      addStory(value, title, currentTopic);
      setValue("");
      setTitle("");
    }
  }

  return (
    <Container fluid>
      <InputGroup className="mb-3">
        <DropdownButton
          variant="outline-secondary"
          title="Topics"
          id={"topic-input-dropdown"}
          disabled={props.currentTopic !== "Timeline"}
        >
          {topicList}
        </DropdownButton>
        <Form.Control
          id={"topic-input"}
          readOnly
          placeholder="Select Topic"
          value={topic}
          aria-label="Text input with dropdown button"
          contentEditable="false"
          className="topic-input"
          disabled={props.currentTopic !== "Timeline"}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="story-title">Title</InputGroup.Text>
        <Form.Control
          placeholder="New Title"
          aria-label="New Title"
          aria-describedby="story-title"
          value={title}
          onChange={handleTitleChange}
          maxLength="1024"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="story-content">Content</InputGroup.Text>
        <Form.Control
          as="textarea"
          placeholder="New Story"
          aria-label="New Story"
          aria-describedby="story-content"
          value={value}
          onChange={handleContentChange}
          maxLength="4096"
        />
      </InputGroup>
      <InputGroup className="align-items-end">
        <Button variant="outline-secondary" value="Post" onClick={handleSubmit} className="ms-auto">Post</Button>
      </InputGroup>
    </Container>
  );
}

export default NewStory;