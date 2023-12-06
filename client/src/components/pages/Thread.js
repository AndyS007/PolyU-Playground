import React, { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import ThreadCommentsBlock from "../modules/Thread/ThreadCommentsBlock";
import ThreadHead from "../modules/Thread/ThreadHead";
import { get } from "../../utilities";
import ThreadStory from "../modules/Thread/ThreadStory";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";

const Thread = (props) => {
  const [story, setStory] = useState(null);
  const params = useParams();

  useEffect( () => {
      get("/api/thread-story", { storyId : params.storyId}).then((storyObj) => {
        setStory(storyObj);
      });
    }, []);

  function handleBackToTopClick() {
    scroll(0, 0);
  }

  return (
    <>
      <Container fluid className="mt-5">
        <Row>
          {
            story !== null &&
            <Col className="col-md-7 m-auto">
              <ThreadHead />
              <ThreadStory
                story_content={story.content}
                story_topic={story.related_topic}
                story_title={story.title}
                story_creator_name={story.creator_name}
                story_creator_id={story.creator_id}
                story_create_time={story.create_time}
                story_lastModified={story.lastModified}
                story_comment_count={story.comment_count}
              />
              <ThreadCommentsBlock
                story_id={story._id}
                story_comment_count={story.comment_count}
                creator_id={story.creator_id}
                userId={props.userId}
                isLoggedIn={props.isLoggedIn}
                banned={props.banned}
              />
            </Col>
          }
        </Row>
        <Container>
          <div className="sticky-bottom-right-button">
            <a onClick={handleBackToTopClick} className="back-to-top-link" title="Back to top">
              <i className="bi bi-arrow-up-circle back-to-top-icon"></i>
            </a>
          </div>
        </Container>
      </Container>
    </>
  );
}

export default Thread;
