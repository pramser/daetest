// Dependencies
import React, { Component } from "react";
import { Route } from "react-router-dom";

// Components
import Header from "./header";
import Dashboard from "./dashboard";
import Results from "./results";
import Coverage from "./coverage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/results" component={Results} />
        <Route exact path="/coverage" component={Coverage} />
      </div>
    );
  }
}

export default App;
