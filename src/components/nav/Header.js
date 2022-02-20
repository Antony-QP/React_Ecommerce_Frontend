import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  ShrinkOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Search from "../forms/Search";

// Logout
import firebase from "firebase";

export const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let history = useHistory();
  let { user, cart } = useSelector((state) => ({ ...state }));

  const { SubMenu, Item } = Menu;

  const handleClick = (e) => {
    // console.log(e.key)
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item key='home' icon={<AppstoreOutlined />}>
        <Link to='/'>Home</Link>
      </Item>

      <Item key='Shop' icon={<ShoppingOutlined />}>
        <Link to='/shop'>Shop</Link>
      </Item>

      <Item key='cart' icon={<ShoppingCartOutlined />}>
        <Link to='/cart'>
          <Badge count={cart.length} offset={[9,0]}>
            Cart
          </Badge>
        </Link>
      </Item>



      {!user && (
        <Item key='Register' icon={<UserAddOutlined />} className='float-right'>
          <Link to='/register'>Register</Link>
        </Item>
      )}

      {!user && (
        <Item key='login' icon={<UserOutlined />} className='float-right'>
          <Link to='/login'>Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          key='SubMenu'
          icon={<SettingOutlined />}
          title={user.name.split("@")[0]}
          className='float-right'>
          {user && user.role === "subscriber" && (
            <Item>
              <Link to='/user/history'>Dashboard</Link>
            </Item>
          )}
          {user && user.role === "admin" && (
            <Item>
              <Link to='/admin/dashboard'>Dashboard</Link>
            </Item>
          )}
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}

      <span className='float-right p-1'>
        <Search />
      </span>
    </Menu>
  );
};

export default Header;
