// Dependencies
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// CSS
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import App from "./app";

// Font-Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendar,
  faCheck,
  faChevronRight,
  faChevronUp,
  faClock,
  faPollH,
  faTimes,
  faVial
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faCalendar,
  faCheck,
  faChevronRight,
  faChevronUp,
  faClock,
  faPollH,
  faTimes,
  faVial
);

// Entry-point for test-mon-client
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
