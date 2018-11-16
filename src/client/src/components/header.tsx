// Dependencies
import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface HeaderProps extends RouteComponentProps<any> {}

class Header extends Component<HeaderProps> {
  state = {
    isOpen: false
  };

  toggle = () => {};

  render() {
    return (
      <Navbar className="Header" light expand="md">
        <NavbarBrand href="/">test-mon</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink
                active={this.props.location.pathname == "/results"}
                href="/results"
              >
                Results
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={this.props.location.pathname == "/coverage"}
                href="/coverage"
              >
                Coverage
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Header);
