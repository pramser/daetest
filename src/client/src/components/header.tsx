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

class Header extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {};

  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">test-mon</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/results">Results</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/coverage">Coverage</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;
