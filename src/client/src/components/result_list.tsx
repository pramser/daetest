// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "reactstrap";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

// Data
import { results } from "../repositories/result_repository";

type Result = {
  id: number;
  date: Date;
  product: string;
  type: string;
  passed: number;
  failed: number;
};

class ResultList extends Component<{}, { results: Result[] }> {
  state = { results: [] as Result[] };

  componentDidMount() {
    this.setState({ results });
  }

  createResult = () => {
    fetch("http://localhost:3001/results").then(() => {
      alert("fetched!");
    });
  };

  render() {
    return (
      <div className="Results">
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
              .map(({ id, date, product, type, passed, failed }, r) => (
                <tr className="result">
                  <td title={date.toDateString()}>
                    {distanceInWordsToNow(date)} ago
                  </td>
                  <td>{product}</td>
                  <td>{type}</td>
                  <td>{passed}</td>
                  <td>{failed}</td>
                  <td>
                    <Link to={`/results/${id}`}>View</Link>
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

export default ResultList;
