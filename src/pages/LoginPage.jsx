import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message, Typography, notification } from 'antd';

import { sendData } from "../utils/api";
import { AuthContext } from "../providers/AuthProvider";
import { jwtDecode } from "jwt-decode";

const { Title, Text } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const resp = await sendData("/api/v1/auth/login", formData);

      if (resp?.access_token) {
        const decoded = jwtDecode(resp.access_token);

        // Ambil data dari token
        const userData = {
          user_id: decoded.user_id || decoded.sub,
          username: decoded.username || '',
          role: decoded.role || 'user', 
        };

        // Simpan ke localStorage
        localStorage.setItem("token", resp.access_token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("user_id", userData.user_id);

        login(resp.access_token);
        message.success("Login berhasil!");
        navigate("/dashboard");
      } else {
        failedLogin();
      }
    } catch (error) {
      console.log(error);
      failedLogin();
    } finally {
      setLoading(false);
    }
  };

  const failedLogin = () => {
    api.error({
      message: "Gagal login",
      description: "Email atau password salah",
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #ffe4ec, #ffffff)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      {contextHolder}
      <Card
        style={{
          width: 400,
          borderRadius: 10,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <Title level={3} style={{ color: '#ec407a', marginBottom: 0, fontFamily: 'Poppins' }}>
            Curhat<span style={{ color: '#000' }}>.in</span>
          </Title>
          <Text type="secondary">Silakan login untuk melanjutkan</Text>
        </div>

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email wajib diisi' }]}
          >
            <Input size="large" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Password wajib diisi' }]}
          >
            <Input.Password size="large" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              style={{
                backgroundColor: '#ec407a',
                borderColor: '#ec407a',
                fontWeight: 'bold',
              }}
            >
              Masuk
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <Text>
            Belum punya akun?{' '}
            <a href="/register" style={{ color: '#ec407a' }}>
              Daftar
            </a>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
