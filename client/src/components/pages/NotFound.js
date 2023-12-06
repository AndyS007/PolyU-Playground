import React from "react";
import { Container } from "react-bootstrap";
import "../../styles/App.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  function backToLast() {
    navigate(-1);
  }

  return (
    <Container className="page-not-found">
      <h1 className="not-found-header">404 Not Found.</h1>
      <p className="not-found-paragraph">Sorry, the page you request does not exist!</p>
      <a className="back-to-last-link" onClick={backToLast} >return to last page.</a>
    </Container>
  );
};

export default NotFound;
