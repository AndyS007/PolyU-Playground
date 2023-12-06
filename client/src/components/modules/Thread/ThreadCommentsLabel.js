import React from "react";
import { Container } from "react-bootstrap";

const ThreadCommentsLabel = (props) => {
  return (
    <Container className="thread-comment-count">
      <p>{props.comment_count} comments</p>
    </Container>
  );
}

export default ThreadCommentsLabel;