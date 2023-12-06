import { Container } from "react-bootstrap";
import React from "react";

const UnLogin = () => {
  return (
    <Container className="page-not-found">
      <h1 className="not-found-header">Please Log In.</h1>
      <p className="not-found-paragraph">Sorry, you have no auth to visit this page!</p>
    </Container>
  )
}

export default UnLogin;