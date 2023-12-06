import React, { useState } from "react";
import { Container, DropdownButton, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { post } from "../../../utilities";

const NewTopic = (props) => {
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");

  function handleTopicNameChange(event) {
    event.preventDefault();
    setTopicName(event.target.value);
  }

  function handleDescriptionChange(event) {
    event.preventDefault();
    setDescription(event.target.value);
  }

  // called when the user hits "Submit" for a new post
  function handleSubmit(event) {
    const DESCRIPTION = 1024;
    // if the content is empty, should prompt user to write something
    if (topicName === "") {
      alert("The topic name is empty!");
    } else if (description === "") {
      alert("The description is empty!");
    } else {
      event.preventDefault();
      addTopic(topicName, description);
      setTopicName("");
      setDescription("");
    }
  }

  function addTopic(topicName, description) {
    const body = {
      topic_name: topicName,
      description: description
    };

    post("/api/topic", body).then((topic) => {
      props.addNewTopic(topic);
    })

    props.handleNewTopicModalCLose();
    alert("Add new topic successfully!");
  }

  return (
    <Container fluid>
      <InputGroup className="mb-3">
        <InputGroup.Text id="topic-name">Topic Name</InputGroup.Text>
        <Form.Control
          placeholder="New Topic"
          aria-label="New Topic"
          aria-describedby="topic-name"
          value={topicName}
          onChange={handleTopicNameChange}
          maxLength="128"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="topic-description">Description</InputGroup.Text>
        <Form.Control
          as="textarea"
          placeholder="Topic Description"
          aria-label="Topic Description"
          aria-describedby="Topic Description"
          value={description}
          onChange={handleDescriptionChange}
          maxLength="1024"
        />
      </InputGroup>
      <Container className="text-end">
        <Button variant="light" onClick={props.handleNewTopicModalCLose} className="me-2">Cancel</Button>
        <Button variant="dark" onClick={handleSubmit}>Submit</Button>
      </Container>
    </Container>
  )
}

export default NewTopic;