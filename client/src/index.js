import React from "react";
import App from "./components/App.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router} from "react-router-dom";

// renders React Component "Root" into the DOM element with ID "root"
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Router>
    <App />
  </Router>
);

// allows for live updating
module.hot.accept();
