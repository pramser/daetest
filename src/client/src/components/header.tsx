// Dependencies
import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface HeaderProps extends RouteComponentProps<any> {}

class Header extends Component<HeaderProps> {
  state = {
    isOpen: false
  };

  toggle = () => {};

  render() {
    return (
      <header>
        <Navbar className="Header" light expand="md">
          <NavbarBrand className="Header-brand" href="/">
            test-mon
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink active={this.props.location.pathname == '/'} href="/">
                  <FontAwesomeIcon
                    icon="home"
                    style={{ marginRight: '0.40em' }}
                  />
                  Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.props.location.pathname == '/tests'}
                  href="/tests"
                >
                  <FontAwesomeIcon
                    icon="vial"
                    style={{ marginRight: '0.40em' }}
                  />
                  Tests
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.props.location.pathname == '/coverages'}
                  href="/coverages"
                >
                  <FontAwesomeIcon
                    icon="poll-h"
                    style={{ marginRight: '0.40em' }}
                  />
                  Coverages
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default withRouter(Header);
