import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import '../components/WelcomeSection.css';
import landingImage from '../assets/images/landingpage2.png';

const { Title, Paragraph } = Typography;


const Dashboard = () => {

  const [forums, setForums] = useState([]);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
  fetch(`${apiUrl}/api/v1/thread`)
    .then((res) => res.json())
    .then((data) => setForums(Array.isArray(data.threads) ? data.threads : []))
    .catch(() => console.error("Gagal memuat forum"));
}, []);

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

        {/* Bagian 1: Landing Page */}
        <div style={{ maxWidth: 580 }}> 
          <h1 className="paragraph-container" style={{ fontSize: '25px', color: '#fff', paddingBottom: '10px'}}>
            Hai! Selamat datang di
          </h1>
          <Title level={1} className="gradient-title" style={{ fontSize: '70px', color: '#ec407a' }}>
          Curhat.<span style={{ color: "#fff" }}>in</span>
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

      {/* Bagian 2: Forum Diskusi */}
      <div style={{ backgroundColor: '#ffffff', padding: '40px 20px' }}>
        <Row justify="center">
          <Col xs={24} md={20}>
            <Card
              title="Forum Diskusi"
              extra={
                <Button
                  type="primary"
                  onClick={() => navigate('/forum')}
                  style={{ backgroundColor: '#ec407a', borderColor: '#ec407a' }}
                >
                  Buat Forum Kalian
                </Button>
              }
              style={{ borderRadius: 12 }}
            >
              {forums.length === 0 ? (
                <Paragraph>Tidak ada forum saat ini.</Paragraph>
              ) : (
                forums.slice(0, 3).map((forum) => (
                  <Card
                    key={forum.id}
                    type="inner"
                    title={forum.title}
                    style={{ marginBottom: 16 }}
                  >
                    <Paragraph ellipsis={{ rows: 2 }}>{forum.content}</Paragraph>
                    <Paragraph type="secondary" style={{ marginTop: 8 }}>
                      Dibuat oleh: {forum.username || "Anonim"}
                    </Paragraph>
                  </Card>
                ))
              )}
            </Card>
          </Col>
        </Row>
      </div>

      {/* Bagian 3: Seminar Webinar */}
      <div style={{ backgroundColor: '#ffffff', padding: '40px 20px' }}>
        <Row justify="center">
          <Col xs={24} md={20}>
            <Card title="Seminar & Webinar" variant="outlined" style={{ borderRadius: 12 }}>
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
