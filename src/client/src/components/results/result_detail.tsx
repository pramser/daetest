// Dependencies
import React, { Component } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane, Table } from "reactstrap";

// Data
import { result_data } from "../../repositories/result_repository";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TestCase = {
  test_name: string;
  result: boolean;
};

class ResultDetail extends Component<
  {},
  { result: TestCase[]; activeTab: string }
> {
  state = { result: [] as TestCase[], activeTab: "tests" as string };

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
              active={this.state.activeTab === "tests"}
              onClick={() => this.toggle("tests")}
            >
              Tests
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
          <TabPane tabId="tests">
            <Table>
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {this.state.result.map(({ test_name, result }) => (
                  <tr>
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
          <TabPane tabId="raw">{JSON.stringify(this.state.result)}</TabPane>
        </TabContent>
      </div>
    );
  }
}

export default ResultDetail;
