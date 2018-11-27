// Dependencies
import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

// Data
import { results } from "../repositories/result_repository";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Result = {
  id: number;
  date: Date;
  product: string;
  type: string;
  passed: number;
  failed: number;
};

class ResultList extends Component<any, { results: Result[] }> {
  state = { results: [] as Result[] };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.setState({ results });
  }

  createResult = () => {
    fetch("http://localhost:3001/results").then(() => {
      alert("fetched!");
    });
  };

  handleRowClick(id: number) {
    this.props.history.push(`/results/${id}`);
  }

  render() {
    return (
      <div className="Results">
        <Table hover>
          <thead className="thead-dark">
            <tr>
              <th>Date</th>
              <th>File</th>
              <th>Product</th>
              <th>Type</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.results
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map(({ id, date, product, type, passed, failed }, r) => (
                <tr className="result" onClick={() => this.handleRowClick(id)}>
                  <td title={date.toDateString()}>
                    {distanceInWordsToNow(date)} ago
                  </td>
                  <td>file_name.xml</td>
                  <td>{product}</td>
                  <td>{type}</td>
                  <td>
                    {getStatus(passed, failed) > 0 ? (
                      <FontAwesomeIcon icon="times" color="red" />
                    ) : (
                      <FontAwesomeIcon icon="check" color="green" />
                    )}
                  </td>
                  <td>
                    <FontAwesomeIcon icon="chevron-right" color="grey" />
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

function getStatus(passed: number, failed: number): number {
  var failure_rate = failed / (passed + failed);
  return failure_rate * 100;
}

export default ResultList;
