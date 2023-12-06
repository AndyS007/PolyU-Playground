import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { convertToLocalTime } from "../../../utilities.js";
import "../../../styles/SingleStory.css"


/**
 * Story is a component that renders creator and content of a story
 *
 */
const SingleStory = (props) => {
  return (
    <div className="Card-story">
      <Container fluid className="mt-1">
        <Row>
          <Col className="col-6 pb-3 story-head">
            <Link to={`/profile/${props.story_creator_id}`} className="u-link u-bold">
              {props.story_creator_name}
            </Link>
            <span className="create-time-display"> at {convertToLocalTime(props.story_create_time)}</span>
          </Col>
          <Col className="col-6 text-end pb-3 story-head">
            <span className="story-topic">{props.story_topic}</span>
          </Col>
        </Row>
        <div className="story-title">{props.story_title}</div>
        <div className="story-content">
          <pre className="story-content-pre">{props.story_content}</pre>
        </div>
      </Container>
    </div>
  );
};

export default SingleStory;
