import React, { Component } from "react";
import { Route } from "react-router-dom";

import RunList from "./run_list";
import RunDetail from "./run_detail";

class Tests extends Component<any, any> {
  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={RunList} />
        <Route path={`${this.props.match.url}/:runId`} component={RunDetail} />
      </div>
    );
  }
}

export default Tests;
