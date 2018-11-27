// Dependencies
import React, { Component } from "react";
import { Route } from "react-router-dom";

// Components
import Header from "./header";
import Dashboard from "./dashboard";
import Results from "./results";
import Coverages from "./coverages";

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