import React, { useEffect, useState } from "react";
import { Container, Modal, Table } from "react-bootstrap";
import "../../../styles/Admin.css";
import { deleteHelper, get } from "../../../utilities";
import DashboardOperationWarning from "./DashboardOperationWarning";
import Button from "react-bootstrap/Button";
import NewTopic from "./NewTopic";

const TopicDashboard = () => {
  const [topics, setTopics] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [newTopicModalShow, setNewTopicModalShow] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedIndex, setSelectIndex] = useState(-1);

  useEffect(() => {
    get("/api/topics").then(topics => setTopics(topics));
  }, [])

  function handleDeleteWarning(topic_name, index, event) {
    event.preventDefault();
    setSelectedTopic(topic_name);
    setSelectIndex(index);
    handleModalOpen();
  }

  function handleDelete(event) {
    event.preventDefault();
    if (selectedTopic !== null) {
      deleteHelper("/api/topic", {topic_name: selectedTopic})
        .then((topic) => {
          if (selectedIndex !== -1) {
            setTopics(topics.slice(0, selectedIndex).concat(topics.slice(selectedIndex+1)));
          }
          setSelectedTopic(null);
          setSelectIndex(-1);
        })
        .catch((err) => {
          console.log(err);
      });
    }
    handleModalClose();
    alert("Delete topic successfully!");
  }

  function handleAddNewTopic(newTopic) {
    setTopics(topics.concat([newTopic]));
  }

  function handleModalOpen() {
    setModalShow(true)
  }

  function handleModalClose() {
    setModalShow(false);
  }

  function handleNewTopicModalOpen() {
    setNewTopicModalShow(true)
  }

  function handleNewTopicModalCLose() {
    setNewTopicModalShow(false);
  }

  let topicTableBody = [];
  if (topics.length > 0) {
    topicTableBody = topics.map((topic, index) => (
      <tr key={topic._id}>
        <td>{topic.topic_name}</td>
        <td>
          <a className="dashboard-link" title={topic.description}>
            {topic.description.length > 80 ?
              topic.description.toString().substring(0, 80) + "..." : topic.description}
          </a>
        </td>
        <td>{topic._id}</td>
        <td className="text-center">
          <a className="dashboard-link-delete"
             title="delete topic"
             name={topic.topic_name}
             onClick={(e) => handleDeleteWarning(topic.topic_name, index, e)}
          >
            <i className="bi bi-trash" aria-hidden="true"></i>
          </a>
        </td>
      </tr>
    ));
  }

  return (
    <Container className="mt-5">
      <h3 className="text-center">Topic Administration</h3>
      <Container fluid className="mt-5 ps-1 text-end">
        <a className="dashboard-link-add-topic"
           title="new topic"
           onClick={handleNewTopicModalOpen}
        >
          <i className="bi bi-pencil-square" aria-hidden="true"></i>
        </a>
      </Container>
      <Table striped bordered hover responsive className="mt-2 text-nowrap">
        <thead className="fw-bold text-center">
          <tr>
            <td>Topic Name</td>
            <td>Description</td>
            <td>Topic ID</td>
            <td>Operation</td>
          </tr>
        </thead>
          <tbody>
           {topicTableBody}
          </tbody>
      </Table>
      <p className="mt-2 ps-1 dashboard-label">Total: {topics.length}</p>
      <Modal show={modalShow} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DashboardOperationWarning
            opType="delete"
            targetItem={selectedTopic}
            targetType="topic"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleModalClose}>Cancel</Button>
          <Button variant="dark" onClick={handleDelete}>Confirm</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={newTopicModalShow} onHide={handleNewTopicModalCLose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add a new Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewTopic handleNewTopicModalCLose={handleNewTopicModalCLose} addNewTopic={handleAddNewTopic}/>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default TopicDashboard;