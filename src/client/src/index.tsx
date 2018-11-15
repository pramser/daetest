// Dependencies
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// CSS
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import App from "./components/app";

// Entry-point for test-mon-client
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
