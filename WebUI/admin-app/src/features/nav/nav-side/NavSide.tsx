import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, Layout, Dropdown, Button } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { RootStoreContext } from '../../../app/stores/rootStore';

const NavSide = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;

  const url = useLocation();

  const menu = (
    <Menu>
      <Menu.Item>1</Menu.Item>
      <Menu.Item>2</Menu.Item>
      <Menu.Item onClick={logout}>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Sider
      width={250}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div style={{ height: '60px', backgroundColor: 'black' }}>
        <Dropdown overlay={menu} placement='bottomCenter'>
          <Button style={{ color: '#fff' }} type='link'>
            {user?.username} <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <Menu selectedKeys={[url.pathname]} mode='inline' theme='dark'>
        <Menu.Item key='/dashboard'>
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </Menu.Item>
        <SubMenu key='sub1' title={<span>Sport objects</span>}>
          <Menu.Item key='/sportobjects/overview'>
            <NavLink to='/sportobjects/overview'>Overview</NavLink>
          </Menu.Item>
          <Menu.Item key='/sportobjects/list'>
            <NavLink to='/sportobjects/list'>List</NavLink>
          </Menu.Item>
          <Menu.Item key='/sportobjects/create'>
            <NavLink to='/sportobjects/create'>Create</NavLink>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='/roles'>
          <NavLink to='/roles'>Roles</NavLink>
        </Menu.Item>
        <Menu.Item key='/reviews'>
          <NavLink to='/reviews'>Reviews</NavLink>
        </Menu.Item>
        <Menu.Item key='/sports'>
          <NavLink to='/sports'>Sports</NavLink>
        </Menu.Item>
        <Menu.Item key='/cities'>
          <NavLink to='/cities'>Cities</NavLink>
        </Menu.Item>
        <Menu.Item key='/countries'>
          <NavLink to='/countries'>Countries</NavLink>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default NavSide;
