// Dependencies
import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

// Types
import { Result } from '../../types/Types';

// Data
import { results } from '../../repositories/result_repository';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Badge from 'reactstrap/lib/Badge';

class ResultList extends Component<any, { results: Result[] }> {
  state = { results: [] as Result[] };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.setState({ results });
  }

  createResult = () => {
    fetch('http://localhost:3001/results').then(() => {
      alert('fetched!');
    });
  };

  handleRowClick(id: number) {
    this.props.history.push(`/results/${id}`);
  }

  render() {
    return (
      <div className="Results">
        <Table style={{ border: '2px solid #ddd' }}>
          <thead>
            <tr>
              <th>Status</th>
              <th>
                <FontAwesomeIcon icon="chevron-up" />
              </th>
              <th>Assignee</th>
              <th>Tests</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.results
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map(({ id, date, product, type, passed, failed }, r) => (
                <tr className="result" onClick={() => this.handleRowClick(id)}>
                  <td>
                    {getStatus(passed, failed) > 0 ? (
                      <FontAwesomeIcon icon="times" color="red" />
                    ) : (
                      <FontAwesomeIcon icon="check" color="green" />
                    )}
                  </td>
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
                      <Badge className="meta-pill" color="secondary">
                        {type}
                      </Badge>
                    </div>
                  </td>
                  <td>pramser</td>
                  <td>1,000</td>
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
