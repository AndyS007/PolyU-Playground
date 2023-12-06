import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { post, put } from "../../../utilities";
import { Container, InputGroup, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const NewReply = (props) => {
  const [value, setValue] = useState("");

  function addReply(value) {
    const body = {
      comment_id: props.comment_id,
      content: value,
      create_time: new Date(),
      to_id: props.to_id,
      to_name: props.to_name,
      story_id: props.story_id,
      updateType: "add"
    };
    post("/api/reply", body).then((reply) => {
      // display this reply on the screen
      props.addNewReply(reply);
    });

    // update comment reply count
    const comment_body = {
      comment_id: props.comment_id,
      updateType: "add"
    }
    put("/api/comment", comment_body).then((comment) => {});

    // update story comment count
    const story_body = {
      story_id: props.story_id,
      updateType: "add"
    }

    put("/api/story", story_body).then(() => {
      props.updateCommentCount();
      props.handleModalClose();
    });
  }

  // called whenever the user types in the new post input box
  function handleChange(event) {
    setValue(event.target.value);
  }

  // called when the user hits "Submit" for a new post
  function handleSubmit (event) {
    const COMMENT_LENGTH_LIMITATION = 1024;
    // need to check whether the content is a null string
    // if content is null, prompt user for input content
    if (value === "") {
      alert("The comment is empty!")
    } else if (value.length > COMMENT_LENGTH_LIMITATION) {
      alert("Comment length should not exceed " + COMMENT_LENGTH_LIMITATION + " bytes!");
    } else {
      event.preventDefault();
      addReply(value)
      setValue("");
    }
  }

  return (
      <Container fluid className="mt-3">
        <div>
          <label className="thread-reply-to-label">reply to {props.to_name}: {props.reply_part}</label>
        </div>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="New Reply"
            aria-label="New Reply"
            aria-describedby="reply-content"
            value={value}
            onChange={handleChange}
            maxLength="1024"
          />
        </InputGroup>
        <InputGroup className="align-items-end">
          <Button variant="outline-secondary" value="Reply" onClick={handleSubmit} className="ms-auto">Reply</Button>
        </InputGroup>
      </Container>
  );
}

export default NewReply;