// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "reactstrap";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

type Result = {
  date: Date;
  product: string;
  type: string;
  passed: number;
  failed: number;
};

class Results extends Component<{}, { results: Result[] }> {
  state = { results: [] as Result[] };

  componentDidMount() {
    this.setState({
      results: [
        {
          date: new Date("2018-11-02"),
          product: "schedule",
          type: "int",
          passed: 100,
          failed: 0
        },
        {
          date: new Date("2018-11-01"),
          product: "schedule",
          type: "int",
          passed: 100,
          failed: 0
        },
        {
          date: new Date("2018-11-05"),
          product: "schedule",
          type: "int",
          passed: 95,
          failed: 5
        },
        {
          date: new Date("2018-11-02"),
          product: "schedule",
          type: "int",
          passed: 100,
          failed: 0
        },
        {
          date: new Date("2018-11-03"),
          product: "schedule",
          type: "int",
          passed: 100,
          failed: 0
        },
        {
          date: new Date("2018-11-15"),
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
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Type</th>
              <th>Passed</th>
              <th>Failed</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.results
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map(({ date, product, type, passed, failed }, r) => (
                <tr className="result">
                  <td title={date.toDateString()}>
                    {distanceInWordsToNow(date)} ago
                  </td>
                  <td>{product}</td>
                  <td>{type}</td>
                  <td>{passed}</td>
                  <td>{failed}</td>
                  <td>
                    <Link to="/result">View</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Button onClick={this.createResult}>POST result</Button>
      </div>
    );
  }
}

export default Results;
