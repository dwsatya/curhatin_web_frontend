import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, Button, Image, Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import '../components/WelcomeSection.css';
import landingImage from '../assets/images/landingpage2.png';

const { Title, Paragraph, Text } = Typography;

const Dashboard = () => {
  const [forums, setForums] = useState([]);
  const [seminars, setSeminars] = useState([]);
  const [loadingSeminars, setLoadingSeminars] = useState(true);

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/thread`)
      .then((res) => res.json())
      .then((data) => setForums(Array.isArray(data.threads) ? data.threads : []))
      .catch(() => console.error("Gagal memuat forum"));

    fetchSeminars();
  }, []);

  const fetchSeminars = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/seminar`);
      const data = await response.json();
      setSeminars(data.data.slice(0, 3)); // Ambil 3 seminar terbaru
    } catch (error) {
      console.error(error);
      message.error('Gagal memuat data seminar.');
    } finally {
      setLoadingSeminars(false);
    }
  };

  const formatTanggal = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div>
      {/* Bagian 1: Landing Page */}
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
          <h1 className="paragraph-container" style={{ fontSize: '25px', color: '#fff', paddingBottom: '10px' }}>
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
        <Row justify={"space-between"}>
        <div style={{ marginBottom: 24 }}>
          <Title level={3} style={{ marginBottom: 8, fontFamily: 'Poppins', color: '#ec407a' }}>
            Forum Diskusi
          </Title>
          <div style={{ height: 3, width: 120, backgroundColor: '#ec407a', borderRadius: 6 }} />
        </div>
        <Button
          type="primary"
          onClick={() => navigate('/forum')}
          style={{ backgroundColor: '#ec407a', borderColor: '#ec407a' }}
        >
          Buat Forum Kalian
        </Button>
        </Row>
            <Card
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



      {/* Bagian 3: Seminar & Webinar */}
      <div style={{ backgroundColor: '#ffffff', padding: '40px 20px' }}>
        <Row justify="center">
          <Col xs={24} md={20}>
                  <Row justify={"space-between"}>
        <div style={{ marginBottom: 24 }}>
          <Title level={3} style={{ marginBottom: 8, fontFamily: 'Poppins', color: '#ec407a' }}>
            Informasi Seminar / Webinar
          </Title>
          <div style={{ height: 3, width: 120, backgroundColor: '#ec407a', borderRadius: 6 }} />
        </div>
        <Button
          type="primary"
          onClick={() => navigate('/seminar')}
          style={{ backgroundColor: '#ec407a', borderColor: '#ec407a' }}
        >
          Lihat Semua
        </Button>
        </Row>
            <Card
              style={{ borderRadius: 12 }}
            >
              {loadingSeminars ? (
                <Spin />
              ) : seminars.length === 0 ? (
                <Paragraph>Tidak ada seminar tersedia saat ini.</Paragraph>
              ) : (
                seminars.map((item) => (
                  <Card
                    key={item.id}
                    type="inner"
                    style={{ marginBottom: 16 }}

                  >
                    <Row gutter={16}>
                      {item.image_url && (
                        <Col xs={24} sm={6}>
                          <Image
                            src={item.image_url}
                            alt="gambar seminar"
                            width="100%"
                            height={120}
                            style={{ objectFit: 'cover', borderRadius: 8 }}
                            preview={false}
                          />
                        </Col>
                      )}
                      <Col xs={24} sm={item.image_url ? 18 : 24}>
                        <Title level={4}>{item.title}</Title>
                        <Paragraph ellipsis={{ rows: 2 }}>{item.description}</Paragraph>
                        <Text type="secondary">{formatTanggal(item.date)} - {item.location}</Text>
                      </Col>
                    </Row>
                  </Card>
                ))
              )}
            </Card>
          </Col>
        </Row>
      </div>
      {/* Bagian 4: Ajakan Curhat */}
      <div style={{ backgroundColor: '#fff0f5', padding: '60px 20px', textAlign: 'center' }}>
        <Title level={3} style={{ color: '#ec407a', fontFamily: 'Poppins' }}>Ingin Didengarkan?</Title>
        <Paragraph>
          Pendengar kami yang siap mendengar cerita kamu dengan empati dan tanpa menghakimi.
        </Paragraph>
        <Button
          size="large"
          style={{ backgroundColor: '#ec407a', color: '#fff', border: 'none' }}
          onClick={() => navigate('/curhat')}
        >
          Curhat Sekarang!
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
