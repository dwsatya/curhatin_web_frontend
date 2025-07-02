import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message } from 'antd';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ penting

  const handleLogin = (values) => {
    const { username, password } = values;

    setLoading(true);

    // Simulasi login berhasil
    setTimeout(() => {
      if (username === 'admin' && password === '1234') {
        // Simpan token ke localStorage
        localStorage.setItem('token', 'dummy-token');

        message.success('Login berhasil!');

        // ✅ Pindah ke dashboard
        navigate('/dashboard');
      } else {
        message.error('Username atau password salah');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card title="Login Curhat.in" style={{ width: 350 }}>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item label="Username" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Masuk
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
