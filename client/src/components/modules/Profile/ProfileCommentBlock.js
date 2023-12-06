import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ProfileSingleComment from "./ProfileSingleComment";
import { get } from "../../../utilities.js"

const ProfileCommentBlock = (props) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    get("/api/comments", {creator_id : props.userId}).then((commentObjs) => {
      setComments(commentObjs);
    })
  }, []);

  let commentList = [];
  if (comments.length > 0) {
    commentList = comments.map((commentObj) => (
      <ProfileSingleComment
        key={commentObj._id}
        comment={commentObj}
      />
    ));
  }

  return (
    <Container>
      {commentList}
    </Container>
  )
}

export default ProfileCommentBlock;