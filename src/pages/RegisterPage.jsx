import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message } from 'antd';

const { Title, Text } = Typography;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (values) => {
    const { username, email, password } = values;

    setLoading(true);

    setTimeout(() => {
      console.log("User terdaftar:", { username, email, password });
      message.success('Registrasi berhasil! Silakan login.');
      navigate('/login');
      setLoading(false);
    }, 1000);
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
