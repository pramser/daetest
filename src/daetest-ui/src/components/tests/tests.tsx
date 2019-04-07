// Dependencies
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Components
import TestList from './test_list';
import TestDetail from './test_detail';

class Tests extends Component<any, any> {
  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={TestList} />
        <Route
          path={`${this.props.match.url}/:testId`}
          component={TestDetail}
        />
      </div>
    );
  }
}

export default Tests;
