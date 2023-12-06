import React, { useEffect, useState } from "react";
import "../../../styles/LeftSideBar.css"
import { get } from "../../../utilities";

/**
 * LeftSideBar displays all the topics
 */
const LeftSideBar = (props) => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
      get("/api/topics").then((topicObjs) => {
        setTopics(topicObjs);
        props.handleTopicsList(topicObjs);
      })
    }, [])


    let topicsList = null;
    if (topics.length > 0) {
      topicsList = topics.map((topicObj) => (
        <li className="nav-item" key={topicObj._id}>
          <a className="home-left-side-nav-link" name={topicObj.topic_name} onClick={handleTopicChange}>
            {topicObj.topic_name}
          </a>
        </li>
      ));
    }

  function handleTopicChange(e) {
    e.preventDefault();
    props.onCurrentTopicChange(e.target.name);
  }

  return (
    <div className="home-left-side-bar-container d-flex flex-column flex-shrink-0 text-bg-light" style={{width: "280px"}}>
      <ul className="nav nav-pills flex-column mb-auto fs-5">
        <span className="home-left-side-flag mt-2 ms-3">FEEDS</span>
        <li className="nav-item">
          <a className="home-left-side-nav-link" name="Timeline" onClick={handleTopicChange}>
            TimeLine
          </a>
        </li>
        <span className="home-left-side-flag mt-1 ms-3">TOPICS</span>
        {topicsList}
      </ul>
    </div>
  );
}

export default LeftSideBar;

