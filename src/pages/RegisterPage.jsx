import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message } from 'antd';

const { Title, Text } = Typography;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    const handleRegister = async (values) => {
        const { username, email, password } = values;
        setLoading(true);

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);

        try {
            const response = await fetch("http://127.0.0.1:5000/api/v1/auth/register", {
            method: "POST",
            body: formData,
            });

            const data = await response.json();

            if (response.ok) {
            message.success("Registrasi berhasil! Silakan login.");
            navigate("/login");
            } else {
            message.error(data.message || "Registrasi gagal");
            }
        } catch (err) {
            console.error("Error saat register:", err);
            message.error("Gagal terhubung ke server");
        } finally {
            setLoading(false);
        }
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
      <Card
        style={{
          width: 450,
          borderRadius: 10,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <Title level={3} style={{ color: '#ec407a', marginBottom: 0, fontFamily: 'Poppins' }}>
            Daftar di Curhat<span style={{ color: '#000' }}>.in</span>
          </Title>
          <Text type="secondary">Buat akun untuk mulai curhat dan terhubung</Text>
        </div>

        <Form layout="vertical" onFinish={handleRegister}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Username wajib diisi' }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Email wajib diisi' },
              { type: 'email', message: 'Format email tidak valid' },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Password wajib diisi' }]}
          >
            <Input.Password size="large" />
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
              Daftar
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <Text>
            Sudah punya akun?{' '}
            <a href="/login" style={{ color: '#ec407a' }}>
              Login di sini
            </a>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
