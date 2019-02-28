// Dependencies
import React, { Component } from 'react';
import { Table } from 'reactstrap';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// Data
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateTestCase from '../create_test_case';

const RESULTS_BY_RUN_ID = gql`
  query resultsByRunId($runid: String!) {
    resultsByRunId(runid: $runid) {
      id
      name
      description
      assignee
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
      <Query query={RESULTS_BY_RUN_ID} variables={{ runid }}>
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return 'Is loading...';
          }

          if (error) {
            return 'Error occurred!';
          }

          return (
            <div className="ResultDetail">
              <div className="sub-menu">
                <CreateTestCase runid={runid} onCreate={() => refetch()} />
              </div>
              <Table>
                <thead>
                  <tr>
                    <th>Test Name</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {data.resultsByRunId.map(({ id, name }: any) => (
                    <tr key={id}>
                      <td>{name}</td>
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
