import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment.js";
import NewComment from "./NewComment.js";
import { Container } from "react-bootstrap";
import "../../../styles/CommentsBlock.css";
import ThreadCommentsLabel from "./ThreadCommentsLabel";
import { get } from "../../../utilities";

/**
 * @typedef ContentObject
 * @property {string} _id of story/comment
 * @property {string} creator_name
 * @property {string} creator_id
 * @property {string} content of the story/comment
 */

/**
 * Component that holds all the comments for a story
 *
 * Proptypes
 */
const ThreadCommentsBlock = (props) => {
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(props.story_comment_count);

  useEffect( () => {
      get("/api/comments", {parent : props.story_id}).then((commentObjs) => {
        setComments(commentObjs);
      });
    }, []);

  function handleAddNewComment(comment) {
    setComments([comment].concat(comments));
  }

  function handleUpdateCommentCount() {
    setCommentCount(commentCount+1);
  }

  return (
    <Container className="thread-comment-section">
      <div className="new-comment">
        {props.isLoggedIn && !props.banned &&
          <NewComment
            story_id={props.story_id}
            storyCommentCount={props.story_comment_count}
            addNewComment={handleAddNewComment}
            updateCommentCount={handleUpdateCommentCount}
          /> }
      </div>
      <ThreadCommentsLabel
        comment_count = {commentCount}
      />
      {comments.length === 0 ?
        null :
        <div>
            {comments.map((comment) => (
              <SingleComment
                key={`SingleComment_${comment._id}`}
                _id={comment._id}
                creator_name={comment.creator_name}
                creator_id={comment.creator_id}
                content={comment.content}
                create_time={comment.create_time}
                reply_count={comment.reply_count}
                story_id={props.story_id}
                updateCommentCount={handleUpdateCommentCount}
                isLoggedIn={props.isLoggedIn}
                banned={props.banned}
              />
            ))}
        </div>
      }
    </Container>
  );
};

export default ThreadCommentsBlock;
