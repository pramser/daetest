import React, { Component } from "react";
import { Route } from "react-router-dom";

import TestList from "./test_list";

class Tests extends Component<any, any> {
  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={TestList} />
        <Route
          path={`${this.props.match.url}/:testId`}
          component={() => <div>Hi!</div>}
        />
      </div>
    );
  }
}

export default Tests;
