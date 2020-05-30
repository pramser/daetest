import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = (props: RouteComponentProps) => {
  const [isOpen] = useState(false);
  const toggle = () => {};

  return (
    <header>
      <Navbar className="Header" light expand="md">
        <NavbarBrand className="Header-brand" href="/">
          denouer
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink active={props.location.pathname === "/"} href="/">
                <FontAwesomeIcon
                  icon="home"
                  style={{ marginRight: "0.40em" }}
                />
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={props.location.pathname === "/tests"}
                href="/tests"
              >
                <FontAwesomeIcon
                  icon="vial"
                  style={{ marginRight: "0.40em" }}
                />
                Tests
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={props.location.pathname === "/config"}
                href="/config"
              >
                <FontAwesomeIcon icon="cog" style={{ marginRight: "0.40em" }} />
                Config
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default withRouter(Header);
