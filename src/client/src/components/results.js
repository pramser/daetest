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
    this.setState({
      results: [
        {
          date: "2018-11-1",
          product: "schedule",
          type: "int",
          passed: 100,
          failed: 0
        },
        {
          date: "2018-11-1",
          product: "schedule",
          type: "int",
          passed: 100,
          failed: 0
        },
        {
          date: "2018-11-2",
          product: "schedule",
          type: "int",
          passed: 95,
          failed: 5
        },
        {
          date: "2018-11-2",
          product: "schedule",
          type: "int",
          passed: 100,
          failed: 0
        },
        {
          date: "2018-11-3",
          product: "schedule",
          type: "int",
          passed: 100,
          failed: 0
        },
        {
          date: "2018-11-3",
          product: "schedule",
          type: "int",
          passed: 100,
          failed: 0
        }
      ]
    });
  }

  createResult = () => {
    fetch("http://localhost:3001/results").then(() => {
      alert("fetched!");
    });
  };

  render() {
    return (
      <div className="Results">
        <h1>Results</h1>
        {this.state.results.map(
          ({ date, product, type, passed, failed }, r) => (
            <div className="result">
              <span className="result-col">{date}</span>
              <span className="result-col">{product}</span>
              <span className="result-col">{type}</span>
              <span className="result-col">{passed}</span>
              <span className="result-col">{failed}</span>
            </div>
          )
        )}
        <Button onClick={this.createResult}>POST result</Button>
      </div>
    );
  }
}

export default Results;
