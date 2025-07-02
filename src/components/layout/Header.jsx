// src/components/layout/Header.jsx
import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AntHeader
      style={{
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <div className="logo" style={{ fontWeight: 'bold', fontSize: 20 }}>
        Curhat.in
      </div>

      <Menu mode="horizontal" defaultSelectedKeys={['dashboard']} style={{ flex: 1, justifyContent: 'center' }}>
        <Menu.Item key="dashboard" onClick={() => navigate('/dashboard')}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="profile" onClick={() => navigate('/profile')}>
          Profil
        </Menu.Item>
      </Menu>

      <Button type="primary" danger onClick={handleLogout}>
        Logout
      </Button>
    </AntHeader>
  );
};

export default Header;
