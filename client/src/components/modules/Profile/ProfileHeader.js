import React from "react";
import { Container } from "react-bootstrap";

const ProfileHeader = (props) => {

  return (
    <Container>
      <p className="profile-header mt-5"><strong>{props.user.name}</strong></p>
    </Container>
  )
}

export default ProfileHeader;