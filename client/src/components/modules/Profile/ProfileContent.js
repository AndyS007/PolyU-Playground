import React from "react";
import { Container } from "react-bootstrap";
import { Tab, Tabs } from "react-bootstrap";
import ProfileStoryBlock from "./ProfileStoryBlock";
import ProfileCommentBlock from "./ProfileCommentBlock";

const ProfileContent = (props) => {

  return (
    <Container>
      <Tabs
        defaultActiveKey="stories"
        id="fill-tabs"
        className="profile-tabs mb-3"
        fill
        variant="pills"
      >
        <Tab eventKey="stories" title="Stories" tabClassName="profile-tab">
          <ProfileStoryBlock userId={props.user._id}/>
        </Tab>
        <Tab eventKey="comments" title="Comments" tabClassName="profile-tab">
          <ProfileCommentBlock userId={props.user._id}/>
        </Tab>
      </Tabs>
    </Container>
  )
}

export default ProfileContent;