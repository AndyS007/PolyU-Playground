import React, { useEffect, useState } from "react";
import { Container, Modal, Table } from "react-bootstrap";
import { deleteHelper, get, put } from "../../../utilities";
import { Link } from "react-router-dom";
import "../../../styles/Admin.css";
import DashboardOperationWarning from "./DashboardOperationWarning";
import Button from "react-bootstrap/Button";

const UserDashboard = (props) => {
  const [users, setUsers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const [operationType, setOperationType] = useState("");
  const [operationResult, setOperationResult] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);


  useEffect(() => {
    get("/api/users").then(users => setUsers(users));
  }, [])

  function handleOperationWarning(userId, userName, operationType, result, index, event) {
    event.preventDefault();
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setOperationType(operationType);
    setOperationResult(result);
    setSelectedIndex(index);
    handleModalOpen();
  }

  function handleModalOpen() {
    setModalShow(true);
  }

  function handleModalClose() {
    setModalShow(false);
  }

  function handleConfirm(event) {
    event.preventDefault();
    if (selectedUserId === props.userId) {
      alert("Sorry! You cannot change your own auth!")
    } else {
      if (selectedUserId !== null && operationResult !== null) {
        let updateType = "isAdministrator";
        if (operationType === "update status of") {
          updateType = "banned";
        }
        const body = {
          userId: selectedUserId,
          type: updateType,
          result: operationResult
        }

        put("/api/user", body).then((user) => {
          setSelectedUserId(null);
          setSelectedUserName(null);
          setOperationType("");
          setOperationResult(null);
          if (selectedIndex !== -1) {
            let usersAfterUpdate = users;
            usersAfterUpdate[selectedIndex] = user;
            setUsers(usersAfterUpdate);
            setSelectedUserId(-1);
          }
        })
        alert("Operate successfully!");
      }
    }
    handleModalClose();
  }

  let userTableBody = [];
  if (users.length > 0) {
    userTableBody = users.map((user, index) => (
      <tr key={user._id}>
        <td>
          <Link to={`/profile/${user._id}`}  className="dashboard-link">
            {user.name}
          </Link>
        </td>
        <td>{user._id}</td>
        <td>{user.googleid}</td>
        <td>{user.isAdministrator.toString()}</td>
        <td>{user.banned.toString()}</td>
        <td className="text-center">
          <a className="dashboard-link-user-op"
             title={user.isAdministrator ? "remove admin auth" : "add as administrator"}
             onClick={(e) =>
               handleOperationWarning(user._id, user.name, "update admin auth of", !user.isAdministrator, index, e)}
          >
            <i className={user.isAdministrator ? "bi bi-person-x" : "bi bi-person-plus"} aria-hidden="true"></i>
          </a>
          <a className="dashboard-link-user-op ms-2"
             title={user.banned ? "free user" : "ban user"}
             onClick={(e) =>
               handleOperationWarning(user._id, user.name, "update status of", !user.banned, index, e)}
          >
            <i className={user.banned ? "bi bi-person" : "bi bi-person-dash"} aria-hidden="true"></i>
          </a>
        </td>
      </tr>
    ));
  }

  return (
    <Container className="mt-5">
      <h3 className="text-center">User Administration</h3>
      <Table striped bordered hover responsive className="mt-5 text-nowrap">
        <thead className="fw-bold text-center">
          <tr>
            <td>Name</td>
            <td>ID</td>
            <td>Google ID</td>
            <td>Is Administrator</td>
            <td>Banned</td>
            <td>Operation</td>
          </tr>
        </thead>
          <tbody>
            {userTableBody}
          </tbody>
      </Table>
      <p className="mt-2 ps-1 dashboard-label">Total: {users.length}</p>
      <Modal show={modalShow} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DashboardOperationWarning
            opType={operationType}
            targetItem={selectedUserName}
            targetType="user"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleModalClose}>Cancel</Button>
          <Button variant="dark" onClick={handleConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default UserDashboard;
