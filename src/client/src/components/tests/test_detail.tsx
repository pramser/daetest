// Dependencies
import React, { Component } from 'react';
import { Table } from 'reactstrap';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// Data
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

          return (
            <div className="TestDetail">
              <div className="sub-menu">
                <CreateTestCase runid={runid} onCreate={() => refetch()} />
              </div>
              <Table style={{ border: '2px solid #ddd' }}>
                <thead>
                  <tr>
                    <th>Test Name</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {data.testCasesByRunId.map(({ id, name, info }: any) => (
                    <tr key={id}>
                      <td style={{ flexDirection: 'column' }}>
                        <div>{name}</div>
                        <div>{info}</div>
                      </td>
                      <td>
                        <FontAwesomeIcon icon="times" color="red" />
                      </td>
                    </tr>
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

export default TestDetail;
