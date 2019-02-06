// Dependencies
import React, { Component, MouseEventHandler } from 'react';
import { Table, Badge } from 'reactstrap';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// Types
import { File } from '../../types/Types';

// Data
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GET_FILES = gql`
  {
    allFiles {
      id
      file_name
      product
      meta
      created_at
    }
  }
`;

class TestList extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  handleRowClick = (id: string) => {
    this.props.history.push(`/tests/${id}`);
  };

  render() {
    return (
      <div className="Results">
        <Query query={GET_FILES}>
          {({ loading, error, data }) => {
            if (loading) {
              return 'Is loading...';
            }

            if (error) {
              return 'Error occurred!';
            }

            return (
              <Table style={{ border: '2px solid #ddd' }}>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>
                      <FontAwesomeIcon
                        className="right-pad"
                        icon="chevron-up"
                      />
                      File
                    </th>
                    <th>Assignee</th>
                    <th>Tests</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {data.allFiles.map((file: File) => (
                    <ResultRow
                      key={file.id}
                      result={file}
                      onClick={() => this.handleRowClick(file.id)}
                    />
                  ))}
                </tbody>
              </Table>
            );
          }}
        </Query>
      </div>
    );
  }
}

const ResultRow = (props: {
  result: File;
  onClick?: MouseEventHandler<any>;
}) => {
  const { file_name, product, meta, created_at } = props.result;

  return (
    <tr className="result" onClick={props.onClick}>
      <td>
        <FontAwesomeIcon icon="times" color="red" />
      </td>
      <td style={{ flexDirection: 'column' }}>
        <div className="file-name">{file_name}</div>
        <div className="description-ellipsis">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
        <div style={{ flexDirection: 'row' }}>
          <span className="result-date meta-pill">
            <FontAwesomeIcon icon="clock" className="right-pad" />
            {distanceInWordsToNow(created_at)}
          </span>
          <Badge className="meta-pill" color="primary">
            {product}
          </Badge>
          <Badge className="meta-pill" color="secondary">
            {meta}
          </Badge>
        </div>
      </td>
      <td>{'pramser'}</td>
      <td>1,000</td>
      <td>
        <FontAwesomeIcon icon="chevron-right" color="grey" />
      </td>
    </tr>
  );
};

function getStatus(passed: number, failed: number): number {
  var failure_rate = failed / (passed + failed);
  return failure_rate * 100;
}

export default TestList;
