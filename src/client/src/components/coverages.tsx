// Dependencies
import React, { Component } from "react";
import { Route } from "react-router-dom";

// Components
import CoverageList from "./coverage_list";
import CoverageDetail from "./coverage_detail";

class Coverages extends Component<any, any> {
  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={CoverageList} />
        <Route
          path={`${this.props.match.url}/:coverageId`}
          component={CoverageDetail}
        />
      </div>
    );
  }
}

export default Coverages;
