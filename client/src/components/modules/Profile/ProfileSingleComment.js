import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { convertToLocalTime } from "../../../utilities";
import { get } from "../../../utilities.js"

const ProfileSingleComment = (props) => {
  const [parentStory, setParentStory] = useState(null);

  useEffect(() => {
    get("/api/thread-story", {storyId: props.comment.parent}).then((story) => {
      setParentStory(story);
    })
  }, [])

  return (
    <>
      {
        parentStory !== null &&
          <Container className="profile-single-comment-container mt-3 pt-1 pb-2">
            <div className="mt-2">
              <span className="profile-single-comment-flag">commented on </span>
              <Link to={`/thread/${parentStory._id}`} className="u-link u-bold mt-3">
                {parentStory.title}
              </Link>
              <span className="profile-single-comment-time"> at {convertToLocalTime(props.comment.create_time)}</span>
            </div>
            <div className="mt-2 mb-3">
              <p className="profile-single-comment-content">
                {props.comment.content}
              </p>
            </div>
          </Container>
      }
    </>
  )
}

export default ProfileSingleComment;
