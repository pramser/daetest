// Dependencies
import React, { Component } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

type Result = {
  date: Date;
  product: string;
  type: string;
  passed: number;
  failed: number;
};

class ResultDetail extends Component<
  {},
  { result: Result; activeTab: string }
> {
  state = { result: {} as Result, activeTab: "tests" as string };

  componentDidMount() {
    this.setState({
      result: {
        date: new Date("2018-11-01"),
        product: "schedule",
        type: "int",
        passed: 95,
        failed: 5
      }
    });
  }

  toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({ result: {} as Result, activeTab: tab });
    }
  }

  render() {
    return (
      <div className="ResultDetail">
        <h1>Result Detail</h1>
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
          <TabPane tabId="tests">Tests</TabPane>
          <TabPane tabId="raw">Raw</TabPane>
        </TabContent>
      </div>
    );
  }
}

export default ResultDetail;
