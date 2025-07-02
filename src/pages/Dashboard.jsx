import React from 'react';
import { Card, Col, Row, Typography } from 'antd';

const { Title } = Typography;

const Dashboard = () => {
  return (
    <div>
      <Title level={2}>Dashboard</Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="Total Pengguna" bordered={false}>
            1.024
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Booking Hari Ini" bordered={false}>
            67
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Pendapatan" bordered={false}>
            Rp 12.500.000
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
