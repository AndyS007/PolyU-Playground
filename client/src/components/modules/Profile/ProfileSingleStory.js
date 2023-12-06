import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { convertToLocalTime } from "../../../utilities";

const ProfileSingleStory = (props) => {

  return (
    <Container fluid className="mt-3 profile-single-story-container pt-1 pb-2">
      <div className="mt-2">
        <span className="profile-single-story-header">posted at {convertToLocalTime(props.story.create_time)}</span>
      </div>
      <div>
        <Link to={`/thread/${props.story._id}`} className="u-link u-bold">
          {props.story.title}
        </Link>
        <span className="profile-single-story-topic">{props.story.related_topic}</span>
      </div>
    </Container>
  )
}

export default ProfileSingleStory;
