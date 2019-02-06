// Dependencies
import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Table } from 'reactstrap';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// Types
import { Result } from '../../types/Types';

// Data
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GET_RESULTS = gql`
  {
    allResults {
      id
      name
      description
      assignee
    }
  }
`;

class TestDetail extends Component<{}, { activeTab: string }> {
  state = { activeTab: 'tests' as string };

  toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  render() {
    return (
      <Query query={GET_RESULTS}>
        {({ loading, error, data }) => {
          if (loading) {
            return 'Is loading...';
          }

          if (error) {
            return 'Error occurred!';
          }

          return (
            <div className="ResultDetail">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab === 'tests'}
                    onClick={() => this.toggle('tests')}
                  >
                    Tests
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab === 'raw'}
                    onClick={() => this.toggle('raw')}
                  >
                    Raw
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TestsTab result={data.allResults} />
              </TabContent>
            </div>
          );
        }}
      </Query>
    );
  }
}

const TestsTab = (props: { result: Result[] }) => {
  return (
    <TabPane tabId="tests">
      <Table>
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {props.result.map(({ id, name, description, assignee }, index) => (
            <tr key={id}>
              <td>{name}</td>
              <td>
                <FontAwesomeIcon icon="times" color="red" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TabPane>
  );
};

export default TestDetail;
