/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarEnd,
  NavbarItem,
  NavbarStart,
  Button,
  Container,
} from 'bloomer';

const menuItems = [
  { name: 'Setlists', to: '/setlists' },
  { name: 'Artists', to: '/artists' },
  { name: 'Festivals', to: '/festivals' },
  { name: 'Venues', to: '/venues' },
  { name: 'Statistics', to: '/statistics' },
];

const MainNavbar = ({ location }) => (
  <Navbar isTransparent>
    <Container>
      <NavbarStart>
        {menuItems.map((menuItem, index) => (
          <NavbarItem
            key={index}
            isActive={matchPath(location.pathname, menuItem.to)}
            render={props => (
              <Link to={menuItem.to} {...props}>
                {menuItem.name}
              </Link>
            )}
          />
        ))}
      </NavbarStart>
      <NavbarEnd>
        <NavbarItem>
          <div className="buttons">
            <Button
              isColor="primary"
              render={props => (
                <Link to="/signup" {...props}>
                  <strong>Sign Up</strong>
                </Link>
              )}
            />
            <Button
              isColor="light"
              render={props => (
                <Link to="/signin" {...props}>
                  Log In
                </Link>
              )}
            />
          </div>
        </NavbarItem>
      </NavbarEnd>
    </Container>
  </Navbar>
);

MainNavbar.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(MainNavbar);
