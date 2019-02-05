// Dependencies
import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Table } from 'reactstrap';

// Types
import { TestCase } from '../../types/Types';

// Data
import { result_data } from '../../repositories/result_repository';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TestDetail extends Component<
  {},
  { result: TestCase[]; activeTab: string }
> {
  state = { result: [] as TestCase[], activeTab: 'tests' as string };

  componentDidMount() {
    this.setState({
      result: result_data
    });
  }

  toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  render() {
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
          <TestsTab result={this.state.result} />
          <RawTab result={this.state.result} />
        </TabContent>
      </div>
    );
  }
}

const TestsTab = (props: { result: TestCase[] }) => {
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
          {props.result.map(({ test_name, result }, index) => (
            <tr key={index}>
              <td>{test_name}</td>
              <td>
                {result ? (
                  <FontAwesomeIcon icon="check" color="green" />
                ) : (
                  <FontAwesomeIcon icon="times" color="red" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TabPane>
  );
};

const RawTab = (props: { result: TestCase[] }) => {
  return (
    <TabPane tabId="raw">
      <div className="raw-data">{JSON.stringify(props.result)}</div>
    </TabPane>
  );
};

export default TestDetail;
