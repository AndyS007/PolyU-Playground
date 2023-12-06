import React from "react";
import SingleReply from "./SingleReply";
import { Container } from "react-bootstrap";

const RepliesBlock = (props) => {

  const hasReply = props.replies.length !== 0;
  let replyLists = [];
  if (hasReply) {
    replyLists = props.replies.map((reply) => (
      <SingleReply
        key={`Reply_${reply._id}`}
        _id={reply._id}
        from_id={reply.creator_id}
        from_name={reply.creator_name}
        to_id={reply.to_id}
        to_name={reply.to_name}
        reply_content={reply.content}
        create_time={reply.create_time}
        story_id={props.story_id}
        comment_id={props.comment_id}
        addNewReply = {props.addNewReply}
        updateCommentCount = {props.updateCommentCount}
        isLoggedIn = {props.isLoggedIn}
        banned={props.banned}
      />
    ));
  }

  return (
    <Container className="thread-replies-block">
      {replyLists}
    </Container>
  );
}

export default RepliesBlock;