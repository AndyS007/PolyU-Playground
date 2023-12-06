import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin, googleLogout, GoogleOAuthProvider } from "@react-oauth/google"

import "../../styles/NavBar.css";

// This identifies your application to Google's authentication service
const GOOGLE_CLIENT_ID = "817936316188-hiqq44e5b4spg5gjolll40hf8nhlv5nc.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <nav className="NavBar-container bg-black fixed-top">
        <div className="NavBar-title u-inlineBlock">Playground</div>
        <div className="NavBar-linkContainer u-inlineBlock">
          <Link to="/" className="NavBar-link">
            Home
          </Link>
          {props.userId && (
            <Link to={`/profile/${props.userId}`} className="NavBar-link">
              Profile
            </Link>
          )}
          {(props.userId && props.isAdministrator) && (
            <Link to={`/admin`} className="NavBar-link navbar-admin-link">
              Admin
            </Link>
          )}
        </div>
        <div className="login-container u-inlineBlock">
          {props.userId ? (
            <button className="logout-button" onClick={props.handleLogout}>
              Log out
            </button>
          ) : (
            <GoogleLogin
              // onSuccess={props.handleLogin}
              onSuccess={props.handleLogin}
              onError={() => console.log('login failed')}
              useOneTap
            />
          )}
        </div>
      </nav>
    </GoogleOAuthProvider>
  );
};

export default NavBar;
