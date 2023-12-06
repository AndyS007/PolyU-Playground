import React, { useState, useEffect } from "react";
import NavBar from "./modules/NavBar.js";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound.js";
import Profile from "./pages/Profile.js";
import Thread from "./pages/Thread.js";
import { get, post} from "../utilities.js";
import { Container } from "react-bootstrap";

// to use styles, import the necessary CSS files
import "../styles/utilities.css";
import "../styles/App.css";
import Admin from "./pages/Admin";
import UserDashboard from "./modules/Admin/UserDashboard";
import TopicDashboard from "./modules/Admin/TopicDashboard";
import StoryDashboard from "./modules/Admin/StoryDashboard";
import CommentDashboard from "./modules/Admin/CommentDashboard";
import ReplyDashboard from "./modules/Admin/ReplyDashboard";

/**
 * Define the "App" component as a function.
 */
const App = () => {
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdministrator, setIsAdministrator] = useState(false);
  const [banned, setBanned] = useState(true);

  const hasLoggedIn = "hasLoggedIn";
  const userIdKey = "userIdKey";
  const isAdmin = "isAdmin";
  const bannedKey = "bannedKey"

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setIsLoggedIn(true);
        if (user.isAdministrator) {
          setIsAdministrator(true);
        }
        if (!user.banned) {
          setBanned(false);
        }
      } else {
        localStorage.setItem(hasLoggedIn, JSON.stringify(false));
        localStorage.setItem(userIdKey, JSON.stringify(null));
        localStorage.setItem(isAdmin, JSON.stringify(false));
        localStorage.setItem(bannedKey, JSON.stringify(true));
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("storage", () => {
      const loggedIn = JSON.parse(localStorage.getItem(hasLoggedIn));
      const userId = JSON.parse(localStorage.getItem(userIdKey));
      const isAdministrator = JSON.parse(localStorage.getItem(isAdmin));
      const banned = JSON.parse(localStorage.getItem(bannedKey));
      setIsLoggedIn(loggedIn);
      setUserId(userId);
      setIsAdministrator(isAdministrator);
      setBanned(banned);
    })
    //TODO: confirm this is a bug
    return () => window.removeEventListener("storage", () => {});
  }, []);

  const handleLogin = (res) => {
    const userToken = res.credential;
    post("/api/login", { token: userToken }).then((user) => {
      // the server knows we're logged in now
      setUserId(user._id);
      setIsLoggedIn(true);
      localStorage.setItem(hasLoggedIn, JSON.stringify(true));
      localStorage.setItem(userIdKey, JSON.stringify(user._id));
      if (user.isAdministrator) {
        setIsAdministrator(true);
      }
      localStorage.setItem(isAdmin, JSON.stringify(user.isAdministrator));
      if (!user.banned) {
        setBanned(false);
      }
      localStorage.setItem(bannedKey, JSON.stringify(user.banned));
    });
  };

  const handleLogout = () => {
    console.log("Logged out successfully!");
    setUserId(null);
    setIsLoggedIn(false);
    setIsAdministrator(false);
    setBanned(true);
    localStorage.setItem(hasLoggedIn, JSON.stringify(false));
    localStorage.setItem(userIdKey, JSON.stringify(null));
    localStorage.setItem(isAdmin, JSON.stringify(false));
    localStorage.setItem(bannedKey, JSON.stringify(true));
    post("/api/logout");
  };

  // required method: whatever is returned defines what
  // shows up on screen
  return (
    // <> is like a <div>, but won't show
    // up in the DOM tree
    <>
      <NavBar
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userId={userId}
        isLoggedIn={isLoggedIn}
        isAdministrator={isAdministrator}
      />
      <Container fluid>
          <Routes>
            <Route path="/" element={<Home userId={userId} isLoggedIn={isLoggedIn} banned={banned}/>} />
            <Route path="/profile/:userId" element={<Profile userId={userId} isLoggedIn={isLoggedIn} />} />
            <Route path="/thread/:storyId" element={<Thread userId={userId} isLoggedIn={isLoggedIn} banned={banned}/>} />
            <Route path="/admin" element={<Admin userId={userId} isLoggedIn={isLoggedIn}/>} >
              <Route index element={<UserDashboard userId={userId}/>} />
              <Route path="user" element={<UserDashboard userId={userId}/>} />
              <Route path="topic" element={<TopicDashboard />} />
              <Route path="story" element={<StoryDashboard />} />
              <Route path="comment" element={<CommentDashboard />} />
              <Route path="reply" element={<ReplyDashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
      </Container>
    </>
  );
};

export default App;
