// Dependencies
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// Components
import CreateTestCase from '../create_test_case';
import Button from 'reactstrap/lib/Button';
import { faToggleOff } from '@fortawesome/free-solid-svg-icons';
import Collapse from 'reactstrap/lib/Collapse';

const TESTCASES_BY_RUN_ID = gql`
  query testCasesByRunId($runid: String!) {
    testCasesByRunId(runid: $runid) {
      id
      name
      info
      description
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
              <div className="sub-menu">
                <CreateTestCase runid={runid} onCreate={() => refetch()} />
              </div>
              <Table style={{ border: '2px solid #ddd' }} size="sm">
                <thead>
                  <tr>
                    <th>Result</th>
                    <th>Test Name</th>
                  </tr>
                </thead>
                <tbody>
                  {testcases.map((testcase: any) => (
                    <TestCaseRow testcase={testcase} />
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
    const { id, name, info } = this.props.testcase;

    return (
      <tr key={id}>
        <td style={{ width: '10%' }}>
          <FontAwesomeIcon icon="times" color="red" />
        </td>
        <td style={{ width: '90%', flexDirection: 'column' }}>
          <div>
            <span>{name}</span>
            {info && (
              <Button size="sm" onClick={() => this.toggle()}>
                Toggle
              </Button>
            )}
          </div>
          {info && (
            <Collapse isOpen={this.state.collapse}>
              <div
                style={{
                  border: '1px solid black',
                  padding: '0.2em',
                  margin: '0.2em'
                }}
              >
                {info}
              </div>
            </Collapse>
          )}
        </td>
      </tr>
    );
  }
}

export default TestDetail;
