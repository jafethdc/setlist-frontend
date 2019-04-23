import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Navbar,
  NavbarEnd,
  NavbarItem,
  NavbarStart,
  Button,
  Container,
  DropdownItem,
  Icon,
} from 'bloomer';
import useCurrentUser from '../../../custom-hooks/useCurrentUser';
import BasicDropdown from '../../BasicDropdown';
import { useSignOut } from '../../SignOutButton/SignOutButton';
import SetlistSearch from '../SetlistSearch';

const menuItems = [
  { name: 'Setlists', to: '/setlists' },
  { name: 'Artists', to: '/artists' },
  { name: 'Festivals', to: '/festivals' },
  { name: 'Venues', to: '/venues' },
  { name: 'Statistics', to: '/statistics' },
];

const MainNavbar = () => {
  const currentUser = useCurrentUser();
  const signOut = useSignOut();

  return (
    <Navbar isTransparent>
      <Container>
        <NavbarStart>
          {menuItems.map((menuItem, index) => (
            <NavLink
              key={index}
              to={menuItem.to}
              activeClassName="is-active"
              className="navbar-item"
              exact
            >
              {menuItem.name}
            </NavLink>
          ))}
        </NavbarStart>
        <NavbarEnd>
          <NavbarItem>
            <SetlistSearch
              onSubmit={query => console.log('setlist search query', query)}
            />
          </NavbarItem>

          <NavbarItem>
            <div className="buttons">
              {currentUser ? (
                <>
                  <NavLink to="/setlists/new" className="button is-primary">
                    <strong>Add Setlist</strong>
                  </NavLink>
                  <BasicDropdown
                    trigger={
                      <Button isOutlined>
                        {currentUser.username}&nbsp;
                        <Icon className="fa fa-angle-down" isSize="small" />
                      </Button>
                    }
                  >
                    {() => (
                      <>
                        <NavLink to="/profile" className="dropdown-item">
                          Profile
                        </NavLink>
                        <DropdownItem className="hoverable" onClick={signOut}>
                          Sign out
                        </DropdownItem>
                      </>
                    )}
                  </BasicDropdown>
                </>
              ) : (
                <>
                  <NavLink to="/signup" className="button is-primary">
                    <strong>Sign Up</strong>
                  </NavLink>
                  <NavLink to="/signin" className="button is-light">
                    Log In
                  </NavLink>
                </>
              )}
            </div>
          </NavbarItem>
        </NavbarEnd>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
