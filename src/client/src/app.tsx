// Dependencies
import React, { Component } from "react";
import { Route } from "react-router-dom";

// Components
import Header from "./components/header";
import Dashboard from "./components/dashboard";
import Results from "./components/results/results";
import Coverages from "./components/coverages/coverages";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Routes />
      </div>
    );
  }
}

const Routes = () => (
  <div className="App-content">
    <Route exact path="/" component={Dashboard} />
    <Route path="/results" component={Results} />
    <Route path="/coverages" component={Coverages} />
  </div>
);

export default App;
