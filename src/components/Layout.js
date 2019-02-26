import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { withRouter, matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import './Layout.scss';

const { Header, Content, Footer } = Layout;

const menuItems = [
  { name: 'Setlists', to: '/setlists' },
  { name: 'Artists', to: '/artists' },
  { name: 'Festivals', to: '/festivals' },
  { name: 'Venues', to: '/venues' },
  { name: 'Statistics', to: '/statistics' },
];

const Main = ({ children, location }) => {
  const routeMatch = menuItems.findIndex(menuItem =>
    matchPath(location.pathname, menuItem.to)
  );
  const defaultSelectedKeys = routeMatch > -1 ? [routeMatch.toString()] : [];

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo" />
        <Menu
          className="menu"
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={defaultSelectedKeys}
        >
          {menuItems.map((menuItem, index) => (
            <Menu.Item key={index}>
              <Link to={menuItem.to}>{menuItem.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content className="content">
        <div>{children}</div>
      </Content>
      <Footer className="footer">Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
};

Main.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(Main);
