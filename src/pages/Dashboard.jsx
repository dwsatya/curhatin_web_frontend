import React from 'react';
import { Card, Col, Row, Typography, Button } from 'antd';

import '../components/WelcomeSection.css';
import landingImage from '../assets/images/landingpage2.png';



const { Title, Paragraph } = Typography;

const Dashboard = () => {
  return (
    <div>
<div style={{
  backgroundImage: `url(${landingImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '94vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-end',
  textAlign: 'left',
  padding: '0 80px', 
  boxSizing: 'border-box',
}}>
  <div style={{ maxWidth: 580 }}> 
    <h1 className="paragraph-container" style={{ fontSize: '25px', color: '#fff', paddingBottom: '10px'}}>
      Hai! Selamat datang di
    </h1>
    <Title level={1} className="gradient-title" style={{ fontSize: '70px'}}>
     Curhat.in
    </Title>
    <Paragraph className="paragraph-container" style={{
      fontSize: '18px',
      color: '#fff',
      lineHeight: 1.8,
    }}>
      Platform aman dan nyaman untuk berbagi cerita, mendapatkan dukungan, dan menemukan informasi kesehatan mental. Kami di sini untuk kamu tanpa penilaian, hanya ruang untuk didengar.
    </Paragraph>
  </div>
</div>





      {/* Bagian 2: Forum */}
      <div style={{ backgroundColor: '#ffffff', padding: '40px 20px' }}>
        <Row justify="center">
          <Col xs={24} md={20}>
            <Card title="Forum Diskusi" bordered={false} style={{ borderRadius: 12 }}>
              <Paragraph>
                Bergabunglah dengan forum diskusi kami dan temukan topik menarik yang sedang dibahas. Ayo mulai berdiskusi!
              </Paragraph>
              <Button type="primary" style={{ backgroundColor: '#ec407a', borderColor: '#ec407a' }}>
                Masuk ke Forum
              </Button>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Bagian 3: Seminar / Webinar */}
      <div style={{ backgroundColor: '#ffffff', padding: '40px 20px' }}>
        <Row justify="center">
          <Col xs={24} md={20}>
            <Card title="Seminar & Webinar" bordered={false} style={{ borderRadius: 12 }}>
              <Paragraph>
                Dapatkan informasi terbaru tentang seminar dan webinar yang berkaitan dengan kesehatan mental.
              </Paragraph>
              <Button type="primary" style={{ backgroundColor: '#ec407a', borderColor: '#ec407a' }}>
                Lihat Jadwal
              </Button>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Bagian 4: Ajakan Curhat */}
      <div style={{ backgroundColor: '#fff0f5', padding: '60px 20px', textAlign: 'center' }}>
        <Title level={3} style={{ color: '#ec407a' }}>Ingin Didengarkan?</Title>
        <Paragraph>
          Booking pendengar kami yang siap mendengar cerita kamu dengan empati dan tanpa menghakimi.
        </Paragraph>
        <Button size="large" style={{ backgroundColor: '#ec407a', color: '#fff', border: 'none' }}>
          Booking Pendengar Sekarang
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
