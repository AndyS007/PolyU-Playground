import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, InputGroup, Modal } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { convertToLocalTime, get } from "../../../utilities";
import RepliesBlock from "./RepliesBlock"
import NewReply from "./NewReply";

/**
 * Component to render a single comment
 *
 */
const SingleComment = (props) => {
  const [replies, setReplies] = useState([]);
  const [replyCount, setReplyCount] = useState(props.reply_count);
  const [showModal, setShowModal] = useState(false);

  useEffect( () => {
      get("/api/replies", {comment_id : props._id}).then((replyObjs) => {
        setReplies(replyObjs);
      })
    }, [])

  // handle new reply
  function handleAddReply(newReply) {
    setReplies([newReply].concat(replies));
    setReplyCount(replyCount + 1);
  }

  function handleModalShow() {
    setShowModal(true);
  }

  function handleModalClose() {
    setShowModal(false);
  }

  // add a replyBlock
  return (
    <div className="thread-comment-card">
      <Container>
        <Row>
          <Col className="col-11 comment-head">
            <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
              {props.creator_name}
            </Link>
            <span className="thread-comment-create-time"> at {convertToLocalTime(props.create_time)}</span>
          </Col>
          <Col className="col-1 text-end">
            {
              props.isLoggedIn && !props.banned &&
              <a className="reply-icon-link" title="reply" onClick={handleModalShow}>
                <i className="bi bi-chat" aria-hidden="true"></i>
              </a>
            }
          </Col>
        </Row>
        <div className="thread-comment-content">
          <p className="comment-content">{props.content}</p>
        </div>
        <div className="thread-reply-count text-end">
          <p>{replyCount} replies</p>
        </div>
        <RepliesBlock
          replies = {replies}
          story_id = {props.story_id}
          comment_id = {props._id}
          addNewReply = {handleAddReply}
          updateCommentCount = {props.updateCommentCount}
          isLoggedIn = {props.isLoggedIn}
          banned={props.banned}
        />
        <Modal show={showModal} onHide={handleModalClose} centered size="lg">
          <Modal.Body>
            <NewReply
              story_id = {props.story_id}
              comment_id = {props._id}
              to_id = {props.creator_id}
              to_name = {props.creator_name}
              reply_part = {props.content.length > 24 ?
                props.content.toString().substring(0, 24) + "..." : props.content}
              handleModalClose = {handleModalClose}
              addNewReply = {handleAddReply}
              updateCommentCount = {props.updateCommentCount}
            />
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default SingleComment;
