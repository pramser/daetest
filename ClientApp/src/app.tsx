// Dependencies
import React from "react";
import { Route } from "react-router-dom";

// Components
import Header from "./components/header";
import Dashboard from "./components/dashboard";
import Runs from "./components/runs";
import Config from "./components/config";

const App = () => (
  <div className="App">
    <Header />
    <Routes />
  </div>
);

const Routes = () => (
  <div className="App-content">
    <Route exact path="/" component={Dashboard} />
    <Route path="/tests" component={Runs} />
    <Route path="/config" component={Config} />
  </div>
);

export default App;
