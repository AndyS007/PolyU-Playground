import React, { useEffect, useState } from "react";
import { convertToLocalTime, deleteHelper, get, put } from "../../../utilities";
import { Container, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../styles/Admin.css";
import DashboardOperationWarning from "./DashboardOperationWarning";
import Button from "react-bootstrap/Button";

const CommentDashboard = () => {
  const [comments, setComments] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [selectedCommentContent, setSelectedCommentContent] = useState("");
  const [selectedReplyCount, setSelectedReplyCount] = useState(0);
  const [selectedIndex, setSelectIndex] = useState(-1);
  const [selectedStoryId, setSelectedStoryId] = useState(null);

  useEffect(() => {
    get("/api/comments").then(comments => setComments(comments));
  }, [])

  function handleDeleteWarning(index, event) {
    event.preventDefault();
    setSelectedCommentContent(comments[index].content);
    setSelectedCommentId(comments[index]._id);
    setSelectedStoryId(comments[index].parent);
    setSelectedReplyCount(comments[index].reply_count);
    setSelectIndex(index);
    handleModalOpen();
  }

  function handleDelete(event) {
    event.preventDefault();
    if (selectedCommentId !== null) {
      deleteHelper("/api/single-comment", {comment_id : selectedCommentId})
        .then((comment) => {
          if (selectedIndex !== -1) {
            setComments(comments.slice(0, selectedIndex).concat(comments.slice(selectedIndex + 1)));
          }

          // delete related replies
          if (selectedReplyCount > 0) {
            deleteHelper("/api/replies", { comment_id: selectedCommentId })
              .then((deleteRes) => {})
          }

          // update story comment count
          if (selectedStoryId !== null) {
            const story_body = {
              story_id: selectedStoryId,
              updateType: "delete",
              updateCount: -(selectedReplyCount + 1)
            }
            put("/api/story", story_body).then((story) => {
              setSelectedCommentId(null);
              setSelectedCommentContent("");
              setSelectedReplyCount(0);
              setSelectedStoryId(null);
              setSelectIndex(-1);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    handleModalClose();
    alert("Delete comment successfully!");
  }

  function handleModalOpen() {
    setModalShow(true)
  }

  function handleModalClose() {
    setModalShow(false);
  }

  let commentTableBody = [];
  if (comments.length > 0) {
    commentTableBody = comments.map((comment, index) => (
      <tr key={comment._id}>
        <td>
          <Link to={`/profile/${comment.creator_id}`}  className="dashboard-link">
            {comment.creator_name}
          </Link>
        </td>
        <td>
          <Link to={`/thread/${comment.parent}`}  className="dashboard-link" title={comment.content}>
            {comment.content.length > 24 ?
              comment.content.toString().substring(0, 24) + "..." : comment.content}
          </Link>
        </td>
        <td>{comment.reply_count}</td>
        <td>{comment._id}</td>
        <td>{comment.parent}</td>
        <td>{convertToLocalTime(comment.create_time)}</td>
        <td>{convertToLocalTime(comment.last_reply_time)}</td>
        <td className="text-center">
          <a className="dashboard-link-delete"
             title="delete comment"
             onClick={(e) => handleDeleteWarning(index, e)}
          >
          <i className="bi bi-trash" aria-hidden="true"></i>
        </a></td>
      </tr>
    ));
  }

  return (
    <Container className="mt-5">
      <h3 className="text-center">Comment Administration</h3>
      <Table striped bordered hover responsive className="mt-5 text-nowrap">
        <thead className="fw-bold text-center">
        <tr>
          <td>Creator Name</td>
          <td>Content</td>
          <td>Reply Count</td>
          <td>Comment ID</td>
          <td>Story ID</td>
          <td>Create Time</td>
          <td>Last Reply Time</td>
          <td>Operation</td>
        </tr>
        </thead>
          <tbody>
           {commentTableBody}
          </tbody>
      </Table>
      <p className="mt-2 ps-1 dashboard-label">Total: {comments.length}</p>
      <Modal show={modalShow} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DashboardOperationWarning
            opType="delete"
            targetItem={selectedCommentContent}
            targetType="comment"
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

export default CommentDashboard;
