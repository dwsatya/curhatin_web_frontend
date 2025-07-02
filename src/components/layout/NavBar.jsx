// src/components/layout/Navbar.jsx
import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();

  // Highlight menu item yang sedang aktif
  const selectedKey = location.pathname === "/" ? "/dashboard" : location.pathname;

  return (
    <Header style={{ display: "flex", alignItems: "center", background: "#ffd1dc", padding: "0 24px" }}>
      <div style={{ flex: "1 0 auto" }}>
        <Link to="/" style={{ fontSize: "20px", fontWeight: "bold", color: "#ec407a" }}>
          Curhat.<span style={{ color: "#000" }}>in</span>
        </Link>
      </div>

      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        style={{ flex: "0 1 auto", background: "#ffd1dc" }}
      >
        <Menu.Item key="/dashboard">
          <Link to="/dashboard">Home</Link>
        </Menu.Item>
        <Menu.Item key="/forum">
          <Link to="/forum">Forum</Link>
        </Menu.Item>
        <Menu.Item key="/curhat">
          <Link to="/curhat">Curhat</Link>
        </Menu.Item>
        <Menu.Item key="/seminar">
          <Link to="/seminar">Seminar / Webinar</Link>
        </Menu.Item>
        <Menu.Item key="/profile">
          <Link to="/profile">Profile</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
