// Dependencies
import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

// Data
import { results } from "../../repositories/result_repository";
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
              <th>
                <FontAwesomeIcon icon="chevron-up" color="white" />
              </th>
              <th>Tests</th>
              <th>Status</th>
              <th>Assignee</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.results
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map(({ id, date, product, type, passed, failed }, r) => (
                <tr className="result" onClick={() => this.handleRowClick(id)}>
                  <td style={{ flexDirection: "column" }}>
                    <div>file_name.xml</div>
                    <div>Description</div>
                    <div style={{ flexDirection: "row" }}>
                      <span>{product}</span>
                      <span>
                        <FontAwesomeIcon icon="calendar" />
                        {distanceInWordsToNow(date)}
                      </span>
                      <span>{type}</span>
                    </div>
                  </td>
                  <td>1,000</td>
                  <td>
                    {getStatus(passed, failed) > 0 ? (
                      <FontAwesomeIcon icon="times" color="red" />
                    ) : (
                      <FontAwesomeIcon icon="check" color="green" />
                    )}
                  </td>
                  <td>pramser</td>
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
