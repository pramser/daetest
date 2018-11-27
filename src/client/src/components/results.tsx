// Dependencies
import React, { Component } from "react";
import { Route } from "react-router-dom";

// Components
import ResultList from "./result_list";
import ResultDetail from "./result_detail";

class Results extends Component<any, any> {
  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={ResultList} />
        <Route
          path={`${this.props.match.url}/:resultId`}
          component={ResultDetail}
        />
      </div>
    );
  }
}

export default Results;
