// Dependencies
import React, { Component } from "react";
import { Route } from "react-router-dom";

// Components
import Header from "./header";
import Dashboard from "./dashboard";
import Results from "./results";
import ResultDetail from "./result_detail";
import Coverages from "./coverages";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-content">
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/results" component={Results} />
          <Route exact path="/coverages" component={Coverages} />
          <Route exact path="/result" component={ResultDetail} />
        </div>
      </div>
    );
  }
}

export default App;
