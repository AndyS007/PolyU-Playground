import { post, put } from "../../../utilities";
import React from "react";

import "../../../styles/NewPostInput.css";
import { Container, DropdownButton, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class NewComment extends React.Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value : ""
    }
  }

  addComment(value) {
    const body = {
      parent: this.props.story_id,
      content: value,
      create_time: new Date(),
      last_reply_time: new Date()
    };
    post("/api/comment", body).then((comment) => {
      // display this comment on the screen
      this.props.addNewComment(comment);
    });

    // update story comment count
    const story_body = {
      story_id: this.props.story_id,
      updateType: "add"
    }
    put("/api/story", story_body).then(() => {
      this.props.updateCommentCount();
    });
  }

  // called whenever the user types in the new post input box
  handleChange(event) {
    this.setState( {value : event.target.value } );
  };

  // called when the user hits "Submit" for a new post
  handleSubmit (event) {
    //
    const COMMENT_LENGTH_LIMITATION = 1024;

    // need to check whether the content is a null string
    // if content is null, prompt user for input content
    if (this.state.value === "") {
      alert("The comment is empty!")
    } else if (this.state.value.length > COMMENT_LENGTH_LIMITATION) {
      alert("Comment length should not exceed " + COMMENT_LENGTH_LIMITATION + " bytes!");
    } else {
      event.preventDefault();
      this.addComment(this.state.value)
      this.setState( {value : ""} );
    }
  };

  render() {
    return (
      <Container fluid>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="New Comment"
            aria-label="New Comment"
            aria-describedby="comment-content"
            value={this.state.value}
            onChange={this.handleChange}
            maxLength="1024"
          />
        </InputGroup>
        <InputGroup className="align-items-end">
          <Button variant="outline-secondary" value="Post" onClick={this.handleSubmit} className="ms-auto">Comment</Button>
        </InputGroup>
      </Container>
    );
  }
}

export default NewComment;