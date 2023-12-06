import React, { useState } from "react";
import SingleStory from "./SingleStory.js";

import "../../../styles/Card.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * Card is a component for displaying content like stories
 *
 */
const Card = (props) => {
  return (
    <Link to={`/thread/${props._id}`} className="card-link">
      <div className="Card-container">
        <SingleStory
          _id={props._id}
          story_content={props.story_content}
          story_topic={props.story_topic}
          story_title={props.story_title}
          story_creator_name={props.story_creator_name}
          story_creator_id={props.story_creator_id}
          story_create_time={props.story_create_time}
          story_lastModified={props.story_lastModified}
          story_comment_count={props.story_comment_count}
        />
        <Container className="text-end">
          <Link to={`/thread/${props._id}`} title="comments" className="comment-icon-link">
            <i className="bi bi-chat-dots" aria-hidden="true"></i>
            {" " + props.story_comment_count.toString()}
          </Link>
        </Container>
      </div>
    </Link>
  );
}

export default Card;
