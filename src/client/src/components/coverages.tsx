// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

type Coverage = {
  date: Date;
  product: string;
  coverage: number;
};

class Coverages extends Component {
  state = { coverages: [] as Coverage[] };

  render() {
    return (
      <div className="Coverages">
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Coverage</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.coverages
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map(({ date, product, coverage }, r) => (
                <tr className="coverage">
                  <td title={date.toDateString()}>
                    {distanceInWordsToNow(date)} ago
                  </td>
                  <td>{product}</td>
                  <td>{coverage}</td>
                  <td>
                    <Link to="/coverage">View</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Coverages;
