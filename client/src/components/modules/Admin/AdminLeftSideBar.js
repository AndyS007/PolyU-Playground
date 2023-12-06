import React from "react";
import { Link } from "react-router-dom";

import "../../../styles/AdminLeftSideBar.css";

const AdminLeftSideBar = (props) => {

  return (
    <div className="admin-left-side-bar-container d-flex flex-column flex-shrink-0 text-bg-dark" style={{width: "280px"}}>
      <a className="d-flex align-items-center mt-2 mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <i className="bi bi-grid ms-3 me-3 fs-4"></i>
        <span className="fs-4">Admin</span>
      </a>
      <hr></hr>
      <ul className="nav nav-pills flex-column mb-auto fs-5">
        <li className="nav-item">
          <Link to={"/admin/user"} className="admin-nav-link" name="user">
            <i className="bi bi-person ms-2 me-3"></i>
            User
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/admin/topic"} className="admin-nav-link" name="topic">
            <i className="bi bi-card-heading ms-2 me-3"></i>
            Topic
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/admin/story"} className="admin-nav-link" name="story">
            <i className="bi bi-chat-left-text ms-2 me-3"></i>
            Story
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/admin/comment"} className="admin-nav-link" name="comment">
            <i className="bi bi-chat-left-dots ms-2 me-3"></i>
            Comment
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/admin/reply"} className="admin-nav-link" name="reply">
            <i className="bi bi-chat-left ms-2 me-3"></i>
            Reply
          </Link>
        </li>
      </ul>
    </div>
);
}

export default AdminLeftSideBar;