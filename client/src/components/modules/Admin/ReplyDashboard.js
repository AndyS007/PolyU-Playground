import React, { useEffect, useState } from "react";
import { convertToLocalTime, deleteHelper, get, put } from "../../../utilities";
import { Container, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../styles/Admin.css";
import DashboardOperationWarning from "./DashboardOperationWarning";
import Button from "react-bootstrap/Button";

const ReplyDashboard = () => {
  const [replies, setReplies] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedReplyId, setSelectedReplyId] = useState(null);
  const [selectedReplyContent, setSelectedReplyContent] = useState("");
  const [selectedIndex, setSelectIndex] = useState(-1);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [selectedStoryId, setSelectedStoryId] = useState(null);

  useEffect(() => {
    get("/api/replies").then(replies => setReplies(replies));
  }, [])

  function handleDeleteWarning(index, event) {
    event.preventDefault();
    setSelectedReplyContent(replies[index].content);
    setSelectedReplyId(replies[index]._id);
    setSelectedCommentId(replies[index].comment_id);
    setSelectedStoryId(replies[index].story_id);
    setSelectIndex(index);
    handleModalOpen();
  }

  function handleDelete(event) {
    event.preventDefault();
    if (selectedReplyId !== null) {
      deleteHelper("/api/single-reply", {reply_id : selectedReplyId})
        .then((reply) => {
          if (selectedIndex !== -1) {
            setReplies(replies.slice(0, selectedIndex).concat(replies.slice(selectedIndex+1)));
          }
          setSelectedReplyId(null);
          setSelectedReplyContent("")
          setSelectIndex(-1);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // update comment reply count
    if (selectedCommentId !== null) {
      const comment_body = {
        comment_id: selectedCommentId,
        updateType: "delete"
      }
      put("/api/comment", comment_body).then((comment) => {});
    }

    // update story comment count
    if (selectedStoryId !== null) {
      const story_body = {
        story_id: selectedStoryId,
        updateType: "delete",
        updateCount: -1
      }
      put("/api/story", story_body).then((story) => {});
    }

    handleModalClose();
    alert("Delete reply successfully!");
  }

  function handleModalOpen() {
    setModalShow(true)
  }

  function handleModalClose() {
    setModalShow(false);
  }

  let replyTableBody = [];
  if (replies.length > 0) {
    replyTableBody = replies.map((reply, index) => (
      <tr key={reply._id}>
        <td>
          <Link to={`/profile/${reply.creator_id}`}  className="dashboard-link">
            {reply.creator_name}
          </Link>
        </td>
        <td>
          <Link to={`/profile/${reply.to_id}`}  className="dashboard-link">
            {reply.to_name}
          </Link>
        </td>
        <td>
          <Link to={`/thread/${reply.story_id}`}  className="dashboard-link" title={reply.content}>
            {reply.content.length > 24 ?
              reply.content.toString().substring(0, 25) + "..." :
              reply.content
            }
          </Link>
        </td>
        <td>{convertToLocalTime(reply.create_time)}</td>
        <td>{reply._id}</td>
        <td>{reply.comment_id}</td>
        <td>{reply.story_id}</td>
        <td className="text-center">
          <a className="dashboard-link-delete"
             title="delete reply"
             onClick={(e) => handleDeleteWarning(index, e)}
          >
            <i className="bi bi-trash" aria-hidden="true"></i>
          </a>
        </td>
      </tr>
    ));
  }

  return (
    <Container className="mt-5">
      <h3 className="text-center">Reply Administration</h3>
      <Table striped bordered hover responsive className="mt-5 text-nowrap">
        <thead className="fw-bold text-center">
        <tr>
          <td>Creator Name</td>
          <td>To Name</td>
          <td>Content</td>
          <td>Create Time</td>
          <td>Reply ID</td>
          <td>Comment ID</td>
          <td>Story ID</td>
          <td>Operation</td>
        </tr>
        </thead>
        <tbody>
         {replyTableBody}
        </tbody>
      </Table>
      <p className="mt-2 ps-1 dashboard-label">Total: {replies.length}</p>
      <Modal show={modalShow} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DashboardOperationWarning
            opType="delete"
            targetItem={selectedReplyContent}
            targetType="reply"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleModalClose}>Cancel</Button>
          <Button variant="dark" onClick={handleDelete}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ReplyDashboard;
