// Dependencies
import React, { Component } from "react";
import { Button } from "reactstrap";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    this.setState({ results: [{ testName: "test" }] });
  }

  createResult = () => {
    fetch("http://localhost:3001/results").then(() => {
      alert("fetched!");
    });
  };

  render() {
    return (
      <div className="Results">
        <span>Hello, results!</span>
        <Button onClick={this.createResult}>POST result</Button>
      </div>
    );
  }
}

export default Results;
