// Dependencies
import React from "react";
import { Route } from "react-router-dom";

// Components
import Header from "./components/header";
import Dashboard from "./components/dashboard";
import Tests from "./components/tests";
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
    <Route path="/tests" component={Tests} />
    <Route path="/config" component={Config} />
  </div>
);

export default App;
