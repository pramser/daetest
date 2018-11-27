// Dependencies
import React, { Component } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane, Table } from "reactstrap";

// Data
import { coverage_data } from "../repositories/coverage_repository";

type TestCase = {
  test_name: string;
  result: boolean;
};

class CoverageDetail extends Component<
  {},
  { coverage: TestCase[]; activeTab: string }
> {
  state = { coverage: [] as TestCase[], activeTab: "covs" as string };

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
              active={this.state.activeTab === "covs"}
              onClick={() => this.toggle("covs")}
            >
              Report
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={this.state.activeTab === "raw"}
              onClick={() => this.toggle("raw")}
            >
              Raw
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="covs">
            <Table>
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {this.state.coverage.map(({ test_name, result }) => (
                  <tr>
                    <td>{test_name}</td>
                    <td>{result ? "Pass" : "Fail"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TabPane>
          <TabPane tabId="raw">{JSON.stringify(this.state.coverage)}</TabPane>
        </TabContent>
      </div>
    );
  }
}

export default CoverageDetail;
