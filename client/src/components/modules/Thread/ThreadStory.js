import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { convertToLocalTime } from "../../../utilities.js";
import "../../../styles/SingleStory.css"


/**
 * Story is a component that renders creator and content of a story
 *
 */
const ThreadStory = (props) => {
  return (
    <div className="thread-story">
      <Container fluid className="mt-1">
        <div className="thread-story-title text-center">{props.story_title}</div>
        <Row className="mt-3">
          <Col col={11}>
            <Link to={`/profile/${props.story_creator_id}`}  className="u-link u-bold">
              {props.story_creator_name}
            </Link>
            <span className="thread-story-create-time"> at {convertToLocalTime(props.story_create_time)}</span>
          </Col>
        </Row>
        <div className="thread-story-content">
          <pre className="thread-story-content-pre">{props.story_content}</pre>
        </div>
        <div className="thread-story-topic text-end">{props.story_topic}</div>
      </Container>
    </div>
  );
};

export default ThreadStory;
