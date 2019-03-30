// Dependencies
import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { DashboardReport } from '../types/Types';

const GET_DASHBOARD_REPORT = gql`
  {
    getDashboardReport {
      testsTotalCount
      testsFailingCount
    }
  }
`;

class Dashboard extends Component {
  render() {
    return (
      <Query query={GET_DASHBOARD_REPORT}>
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return 'Is loading...';
          }

          if (error) {
            return 'Error occurred!';
          }

          const {
            testsTotalCount,
            testsFailingCount
          } = data.getDashboardReport as DashboardReport;

          return (
            <div className="Dashboard">
              <button onClick={() => refetch()}>Refresh</button>
              <Card>
                <CardHeader>Total Tests</CardHeader>
                <CardBody>{testsTotalCount}</CardBody>
              </Card>
              <Card>
                <CardHeader>Failing Tests</CardHeader>
                <CardBody>{testsFailingCount}</CardBody>
              </Card>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Dashboard;
