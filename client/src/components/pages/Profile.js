import React, { useState, useEffect } from "react";
import { get } from "../../utilities"
import { Outlet, useParams } from "react-router-dom";
import "../../styles/utilities.css";
import "../../styles/Profile.css";
import { Col, Container } from "react-bootstrap";
import ProfileHeader from "../modules/Profile/ProfileHeader";
import ProfileContent from "../modules/Profile/ProfileContent";

const Profile = (props) => {
  const [user, setUser] = useState();
  const params = useParams();

  useEffect(() => {
    document.title = "Profile Page";
	get(`/api/user`, { userid: params.userId }).then((userObj) => {
    setUser(userObj);
  });
  }, []);

  if (!user) {
	return (<div> Loading! </div>);
  }
  return (
    <>
      <Container fluid className="mt-5 profile-container bg-light">
          <ProfileHeader user={user}/>
          <ProfileContent user={user}/>
      </Container>
    </>
  );
};

export default Profile;
