// Dependencies
import React, { Component } from 'react';
import { Table } from 'reactstrap';
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
    }
  }
`;

class TestDetail extends Component<any, { activeTab: string }> {
  state = { activeTab: 'tests' as string };

  toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

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

const TestCaseRow = (props: { testcase: any }) => {
  const { id, name, info } = props.testcase;

  return (
    <tr key={id}>
      <td style={{ width: '10%' }}>
        <FontAwesomeIcon icon="times" color="red" />
      </td>
      <td style={{ width: '90%', flexDirection: 'column' }}>
        <div>{name}</div>
        <div>{info}</div>
      </td>
    </tr>
  );
};

export default TestDetail;
