// Dependencies
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { RestfulProvider } from "restful-react";

// CSS
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import App from "./app";

// Font-Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faChevronDown,
  faChevronRight,
  faClock,
  faCog,
  faEdit,
  faFile,
  faFileUpload,
  faHome,
  faTimes,
  faVial,
} from "@fortawesome/free-solid-svg-icons";

// vial, file, chevron-down, times, clock, chevron-right
// home, cog, check

library.add(
  faCheck,
  faChevronDown,
  faChevronRight,
  faClock,
  faCog,
  faEdit,
  faFile,
  faFileUpload,
  faHome,
  faTimes,
  faVial
);

// Entry-point for test-mon-client
ReactDOM.render(
  <Router>
    <RestfulProvider base="http://localhost:8000">
      <App />
    </RestfulProvider>
  </Router>,
  document.getElementById("root")
);
