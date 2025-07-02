/* eslint-disable react/prop-types */
import { useState } from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [selectedKey, setSelectedKey] = useState("/dashboard");

  const handleMenuKey = (key) => {
    setSelectedKey(key);
  };

  const menuItems = [
    {
      key: "/dashboard",
      label: <NavLink to="/dashboard">Home</NavLink>,
    },
    {
      key: "/create",
      label: <NavLink to="/create">Forum</NavLink>,
    },
    {
      key: "/edit",
      label: <NavLink to="/edit">Curhat</NavLink>,
    },
    {
      key: "/delete",
      label: <NavLink to="/delete">Seminar / Webinar</NavLink>,
    },
    {
      key: "/save",
      label: <NavLink to="/save">Profile</NavLink>,
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1001,
        background: "#fff",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
        padding: "0 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px",
      }}
    >
      {/* Logo */}
      <div style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#FFC0CB", marginRight: "2rem" }}>
        Curhat.<span style={{ color: "black" }}>in</span>
      </div>

      {/* Menu */}
      <Menu
        mode="horizontal"
        items={menuItems}
        selectedKeys={[selectedKey]}
        onSelect={({ key }) => handleMenuKey(key)}
        style={{
          flex: 1,
          borderBottom: "none",
          display: "flex",
          gap: "1.5rem",
          background: "transparent",
        }}
      />
    </div>
  );
}

export default Navbar;
