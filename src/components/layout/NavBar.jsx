import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import "../../index.css";

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user?.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  const selectedKey =
    location.pathname === "/" ? "/dashboard" : location.pathname;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { label: <Link to="/dashboard">Home</Link>, key: "/dashboard" },
    { label: <Link to="/forum">Forum</Link>, key: "/forum" },
    { label: <Link to="/curhat">Curhat</Link>, key: "/curhat" },
    { label: <Link to="/seminar">Seminar / Webinar</Link>, key: "/seminar" },
    { label: <Link to="/profile">Profile</Link>, key: "/profile" },
  ];

  if (isAdmin) {
    menuItems.push({
      label: <Link to="/admin">Admin</Link>,
      key: "/admin",
    });
  }

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
        <Link
          to="/"
          style={{ fontSize: "20px", fontWeight: "bold", color: "#ec407a" }}
        >
          Curhat.<span style={{ color: "#000" }}>in</span>
        </Link>
      </div>

      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={menuItems}
        style={{
          flex: "0 1 auto",
          background: "#fff",
          gap: "15px",
          paddingRight: "100px",
        }}
      />

      {isLoggedIn ? (
        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Link className="login-link" to="/login">
          Login
        </Link>
      )}
    </Header>
  );
};

export default Navbar;
