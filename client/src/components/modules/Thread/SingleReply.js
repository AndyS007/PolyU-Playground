import React, {useState} from "react";
import { Col, Container, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { convertToLocalTime } from "../../../utilities";
import Row from "react-bootstrap/Row";
import NewReply from "./NewReply";

const SingleReply = (props) => {
  const [show, setShow] = useState(false);
  const [replyIconDisplay, setReplyIconDisplay] = useState(false);

  function handleModalShow() {
    setShow(true);
  }

  function handleModalClose() {
    setShow(false);
  }

  function handleReplyIconDisplay() {
    setReplyIconDisplay(true);
  }

  function handleReplyIconDisplayNone() {
    setReplyIconDisplay(false);
  }

  return (
    <Container fluid className="thread-single-reply"
               onMouseEnter={handleReplyIconDisplay}
               onMouseLeave={handleReplyIconDisplayNone}
    >
      <Row>
        <Col className="col-11">
          <Link to={`/profile/${props.from_id}`}  className="u-link u-bold">{props.from_name}</Link>
          <span> to </span>
          <Link to={`/profile/${props.to_id}`}  className="u-link u-bold">{props.to_name}</Link>
          <span className="thread-reply-create-time"> at {convertToLocalTime(props.create_time)}</span>
        </Col>
        <Col className="col-1 text-end">
          {
            props.isLoggedIn && !props.banned && replyIconDisplay &&
            <a className="single-reply-icon-link"
               title="reply"
               onClick={handleModalShow}
            >
              <i className="bi bi-chat" aria-hidden="true"></i>
            </a>
          }
        </Col>
      </Row>
      <p>{props.reply_content}</p>
      <Modal show={show} onHide={handleModalClose} centered size="lg">
        <Modal.Body>
          <NewReply
            story_id = {props.story_id}
            comment_id = {props.comment_id}
            to_id = {props.from_id}
            to_name = {props.from_name}
            reply_part = {props.reply_content.length > 24 ?
              props.reply_content.toString().substring(0, 24) + "..." : props.reply_content}
            handleModalClose = {handleModalClose}
            addNewReply = {props.addNewReply}
            updateCommentCount = {props.updateCommentCount}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default SingleReply;
