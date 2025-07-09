import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  Typography,
  Spin,
  Row,
  Col
} from 'antd';
import {
  TeamOutlined,
  CalendarOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const AdminPage = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(null); // null = loading, true/false = status

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      setAuthorized(false);
      navigate('/');
    } else {
      setAuthorized(true);
    }
  }, [navigate]);

  if (authorized === null) {
    return (
      <div style={{ textAlign: 'center', paddingTop: 100 }}>
        <Spin tip="Memuat..." size="large" />
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 1000,
      margin: '40px auto',
      padding: 20,
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>
        Dashboard Admin
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card
            hoverable
            style={{ borderRadius: 12 }}
            bodyStyle={{ padding: 24 }}
          >
            <TeamOutlined style={{ fontSize: 40, color: '#ec407a' }} />
            <Title level={4} style={{ marginTop: 16 }}>Kelola Pendengar Curhat</Title>
            <Text>Mengelola daftar pendengar yang tersedia untuk sesi curhat.</Text>
            <div style={{ marginTop: 20 }}>
              <Button
                type="primary"
                onClick={() => navigate('/admin/pendengar')}
                style={{
                  backgroundColor: '#ec407a',
                  border: 'none',
                  padding: '8px 20px'
                }}
              >
                Kelola Pendengar
              </Button>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            hoverable
            style={{ borderRadius: 12 }}
            bodyStyle={{ padding: 24 }}
          >
            <CalendarOutlined style={{ fontSize: 40, color: '#ec407a' }} />
            <Title level={4} style={{ marginTop: 16 }}>Kelola Seminar / Webinar</Title>
            <Text>Mengelola jadwal seminar dan webinar kesehatan mental.</Text>
            <div style={{ marginTop: 20 }}>
              <Button
                type="primary"
                onClick={() => navigate('/admin/seminar')}
                style={{
                  backgroundColor: '#ec407a',
                  border: 'none',
                  padding: '8px 20px'
                }}
              >
                Kelola Seminar
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminPage;
