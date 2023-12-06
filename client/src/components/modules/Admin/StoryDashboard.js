import React, { useEffect, useState } from "react";
import { convertToLocalTime, deleteHelper, get, put } from "../../../utilities";
import { Container, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../styles/Admin.css";
import DashboardOperationWarning from "./DashboardOperationWarning";
import Button from "react-bootstrap/Button";

const StoryDashboard = () => {
  const [stories, setStories] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [selectedIndex, setSelectIndex] = useState(-1);
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [selectedStoryTitle, setSelectedStoryTitle] = useState("");

  useEffect(() => {
    get("/api/stories").then(stories => setStories(stories));
  }, [])

  function handleDeleteWarning(story_id, story_title, index, event) {
    event.preventDefault();
    setSelectedStoryId(story_id);
    setSelectIndex(index);
    setSelectedStoryTitle(story_title);
    handleModalOpen();
  }

  function handleDelete(event) {
    event.preventDefault();
    if (selectedStoryId !== null) {
      deleteHelper("/api/single-story", {story_id : selectedStoryId})
        .then((story) => {
          if (selectedIndex !== -1) {
            setStories(stories.slice(0, selectedIndex).concat(stories.slice(selectedIndex + 1)));
          }})
        .catch((err) => {
          console.log(err);
        });
    }

    // delete related replies
    deleteHelper("/api/replies", {story_id : selectedStoryId}).then(() => {
      // delete related comments
      deleteHelper("/api/comments", {parent : selectedStoryId}).then(() => {
        setSelectedStoryId(null);
        setSelectIndex(-1);
        setSelectedStoryTitle("");
      });
    });

    handleModalClose();
    alert("Delete story successfully!");
  }

  function handleModalOpen() {
    setModalShow(true)
  }

  function handleModalClose() {
    setModalShow(false);
  }

  let storyTableBody = [];
  if (stories.length > 0) {
    storyTableBody = stories.map((story, index) => (
      <tr key={story._id}>
        <td>
          <Link to={`/thread/${story._id}`}  title={story.title} className="dashboard-link">
            {story.title.length > 40 ? story.title.toString().slice(0, 50) + "..." : story.title}
          </Link>
        </td>
        <td>{story.related_topic}</td>
        <td>
          <Link to={`/profile/${story.creator_id}`}  className="dashboard-link">
            {story.creator_name}
          </Link>
        </td>
        <td>{story.comment_count}</td>
        <td>{story._id}</td>
        <td>{convertToLocalTime(story.create_time)}</td>
        <td>{convertToLocalTime(story.last_comment_time)}</td>
        <td className="text-center">
          <a className="dashboard-link-delete"
             title="delete story"
             onClick={(e) => handleDeleteWarning(story._id, story.title, index, e)}
          >
            <i className="bi bi-trash" aria-hidden="true"></i>
          </a>
        </td>
      </tr>
    ));
  }

  return (
    <Container className="mt-5">
      <h3 className="text-center">Story Administration</h3>
      <Table striped bordered hover responsive className="mt-5 text-nowrap">
        <thead className="fw-bold text-center">
          <tr>
            <td>Title</td>
            <td>Topic</td>
            <td>Author</td>
            <td>Comment Count</td>
            <td>Story ID</td>
            <td>Create Time</td>
            <td>Last Comment Time</td>
            <td>Operation</td>
          </tr>
        </thead>
          <tbody>
           {storyTableBody}
          </tbody>
      </Table>
      <p className="mt-2 ps-1 dashboard-label">Total: {stories.length}</p>
      <Modal show={modalShow} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DashboardOperationWarning
            opType="delete"
            targetItem={selectedStoryTitle}
            targetType="story"
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

export default StoryDashboard;
