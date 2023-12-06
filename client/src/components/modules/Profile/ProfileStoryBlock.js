import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { get } from "../../../utilities.js"
import ProfileSingleStory from "./ProfileSingleStory";

const ProfileStoryBlock = (props) => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    get("/api/stories", {creator_id : props.userId}).then((storyObjs) => {
      let reversedStoryObjs = storyObjs.reverse();
      setStories(reversedStoryObjs);
    });
  }, [])

  let storyList = [];
  if (stories.length > 0) {
    storyList = stories.map((storyObj) => (
      <ProfileSingleStory
        key={storyObj._id}
        story={storyObj}
      />
    ));
  }

  return (
    <Container>
      {storyList}
    </Container>
  )

}

export default ProfileStoryBlock;
