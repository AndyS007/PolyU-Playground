import React, { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import AdminLeftSideBar from "../modules/Admin/AdminLeftSideBar";
import { Outlet } from "react-router-dom";
import UnLogin from "./UnLogin";

const Admin = (props) => {
  const [adminType, setAdminType] = useState("user");

  function handleAdminTypeChange(type) {
    setAdminType(type);
  }

  return (
    <>
      {
      props.isLoggedIn ?
        <Container fluid className="mt-5">
          <Row>
            <Col lg={2}>
              <AdminLeftSideBar handleAdminTypeChange={handleAdminTypeChange}/>
            </Col>
            <Col lg={10}>
              <Outlet></Outlet>
            </Col>
          </Row>
        </Container> :
        <UnLogin />
    }
    </>
  );
}

export default Admin;