// Dependencies
import React, { Component } from 'react';

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <h2>Todo List:</h2>
        <ul>
          <li>Object storage in API</li>
          <li>Transforms for test results</li>
          <li>Styling changes to tests/coverages</li>
          <li>Dashboard with product breakdown</li>
        </ul>
      </div>
    );
  }
}

export default Dashboard;
