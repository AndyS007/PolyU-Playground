import React from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";

const DashboardOperationWarning = (props) => {

  return (
    <Container className="text-center">
      <p className="dashboard-delete-warning">Are you sure to {props.opType} {props.targetType}:</p>
      <p className="dashboard-delete-warning">{props.targetItem}</p>
    </Container>
  )
}

export default DashboardOperationWarning;