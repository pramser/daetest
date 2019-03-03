// Dependencies
import React, { Component } from 'react';
import { Table, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// Components
import CreateTestCase from '../create_test_case';

const TESTCASES_BY_RUN_ID = gql`
  query testCasesByRunId($runid: String!) {
    testCasesByRunId(runid: $runid) {
      id
      name
      info
      description
      result
    }
  }
`;

class TestDetail extends Component<any, any> {
  render() {
    const paths = this.props.location.pathname.split('/');
    const runid = paths[paths.length - 1];

    return (
      <Query query={TESTCASES_BY_RUN_ID} variables={{ runid }}>
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return 'Is loading...';
          }

          if (error) {
            return 'Error occurred!';
          }

          const testcases = data.testCasesByRunId;

          return (
            <div className="TestDetail">
              <div>
                <h2>{runid}</h2>
              </div>
              <div className="sub-menu">
                <CreateTestCase runid={runid} onCreate={() => refetch()} />
              </div>
              <Table style={{ border: '2px solid #ddd' }}>
                <thead>
                  <tr>
                    <th>Result</th>
                    <th>Test Name</th>
                  </tr>
                </thead>
                <tbody>
                  {testcases.map((testcase: any) => (
                    <TestCaseRow key={testcase.id} testcase={testcase} />
                  ))}
                </tbody>
              </Table>
            </div>
          );
        }}
      </Query>
    );
  }
}

class TestCaseRow extends Component<{ testcase: any }, { collapse: boolean }> {
  state = { collapse: false };

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { id, name, info, result } = this.props.testcase;

    return (
      <tr key={id}>
        <td style={{ width: '10%' }}>
          <FontAwesomeIcon
            icon={result === 'PASS' ? 'check' : 'times'}
            color={result === 'PASS' ? 'green' : 'red'}
          />
        </td>
        <td style={{ width: '90%', flexDirection: 'column' }}>
          <div>
            <span>{name}</span>
            {info && (
              <span
                style={{ float: 'right', marginRight: '0.5em' }}
                onClick={() => this.toggle()}
              >
                <FontAwesomeIcon icon="chevron-down" color="grey" />
              </span>
            )}
          </div>
          {info && (
            <Collapse isOpen={this.state.collapse}>
              <textarea
                style={{
                  width: '100%',
                  border: '1px solid black',
                  padding: '0.2em',
                  margin: '0.2em'
                }}
              >
                {info}
              </textarea>
            </Collapse>
          )}
        </td>
      </tr>
    );
  }
}

export default TestDetail;
