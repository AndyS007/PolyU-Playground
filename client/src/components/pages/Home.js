import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row"
import { Col } from "react-bootstrap";
import Feed from "../modules/Home/Feed.js";
import LeftSideBar from "../modules/Home/LeftSideBar.js";
import "../../styles/Home.css";

/**
 * Home is the home page of PolyU Playground, display topics and related stories
 *
 */
const Home = (props) => {
  const [currentTopic, setCurrentTopic] = useState('Timeline');
  const [topicsList, setTopicsList] = useState([]);

  function handleTopicChange(topic) {
    setCurrentTopic(topic)
  }

  function handleTopics(topics) {
    setTopicsList(topics)
  }

  function handleBackToTopClick() {
    scroll(0, 0);
  }

  return (
    <>
      <Container fluid className="mt-5">
        <LeftSideBar
          _id = {props._id}
          onCurrentTopicChange={handleTopicChange}
          handleTopicsList={handleTopics}
        />
        <Row className="ps-5">
          <Col lg={7} className="offset-3 mt-5">
            <Feed
              _id = {props.userId}
              userId = {props.userId}
              isLoggedIn = {props.isLoggedIn}
              banned={props.banned}
              currentTopic = {currentTopic}
              topicsList = {topicsList}
            />
          </Col>
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
  )
}

export default Home;