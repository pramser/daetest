// Dependencies
import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Table } from 'reactstrap';

// Types
import { TestCase } from '../../types/Types';

// Data
import { coverage_data } from '../../repositories/coverage_repository';

class CoverageDetail extends Component<
  {},
  { coverage: TestCase[]; activeTab: string }
> {
  state = { coverage: [] as TestCase[], activeTab: 'covs' as string };

  componentDidMount() {
    this.setState({
      coverage: coverage_data
    });
  }

  toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  render() {
    return (
      <div className="CoverageDetail">
        <Nav tabs>
          <NavItem>
            <NavLink
              active={this.state.activeTab === 'covs'}
              onClick={() => this.toggle('covs')}
            >
              Report
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
          <CoverageTab coverage={this.state.coverage} />
          <RawTab coverage={this.state.coverage} />
        </TabContent>
      </div>
    );
  }
}

const CoverageTab = (props: { coverage: TestCase[] }) => {
  return (
    <TabPane tabId="covs">
      <Table>
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {props.coverage.map(({ test_name, result }, index) => (
            <tr key={index}>
              <td>{test_name}</td>
              <td>{result ? 'Pass' : 'Fail'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TabPane>
  );
};

const RawTab = (props: { coverage: TestCase[] }) => {
  return (
    <TabPane tabId="raw">
      <div className="raw-data">{JSON.stringify(props.coverage)}</div>
    </TabPane>
  );
};

export default CoverageDetail;
