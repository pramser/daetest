// Dependencies
import React, { Component } from 'react';
import { Table, Badge } from 'reactstrap';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

// Types
import { Coverage } from '../../types/Types';

// Data
import { coverages } from '../../repositories/coverage_repository';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Coverages extends Component<any, any> {
  state = { coverages: [] as Coverage[] };

  componentDidMount() {
    this.setState({ coverages });
  }

  handleRowClick(id: number) {
    this.props.history.push(`/coverages/${id}`);
  }

  render() {
    return (
      <div className="Coverages">
        <Table style={{ border: '2px solid #ddd' }}>
          <thead>
            <tr>
              <th>Coverage</th>
              <th>
                <FontAwesomeIcon className="right-pad" icon="chevron-up" /> File
              </th>
              <th>Assignee</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.coverages
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map(({ id, date, product, coverage }, r) => (
                <tr
                  className="coverage"
                  onClick={() => this.handleRowClick(id)}
                >
                  <td>{`${coverage}%`}</td>
                  <td style={{ flexDirection: 'column' }}>
                    <div className="file-name">file_name.xml</div>
                    <div className="description-ellipsis">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </div>
                    <div style={{ flexDirection: 'row' }}>
                      <span className="result-date meta-pill">
                        <FontAwesomeIcon icon="clock" className="right-pad" />
                        {distanceInWordsToNow(date)}
                      </span>
                      <Badge className="meta-pill" color="primary">
                        {product}
                      </Badge>
                    </div>
                  </td>
                  <td>pramser</td>
                  <td>
                    <FontAwesomeIcon icon="chevron-right" color="gray" />
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
