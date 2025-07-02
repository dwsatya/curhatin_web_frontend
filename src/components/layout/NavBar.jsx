import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();

  const selectedKey = location.pathname === "/" ? "/dashboard" : location.pathname;

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        display: "flex",
        alignItems: "center",
        background: "#fff",
        padding: "0 50px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ flex: "1 0 auto", fontFamily: "Poppins, sans-serif" }}>
        <Link to="/" style={{ fontSize: "20px", fontWeight: "bold", color: "#ec407a" }}>
          Curhat.<span style={{ color: "#000" }}>in</span>
        </Link>
      </div>

      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        style={{ flex: "0 1 auto", background: "#fff", gap: "15px" }}
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
