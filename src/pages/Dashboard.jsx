import React, { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Row,
  Typography,
  Button,
  Image,
  Spin,
  message,
  Space,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  CalendarOutlined,
  MessageOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

import '../components/WelcomeSection.css';
import landingImage from '../assets/images/landingpage3.png';
import '../App.css';

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

    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const fetchSeminars = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/seminar`);
      const data = await response.json();
      setSeminars(data.data.slice(0, 3));
    } catch (error) {
      console.error(error);
      message.error('Gagal memuat data seminar.');
    } finally {
      setLoadingSeminars(false);
    }
  };

  const formatTanggal = (dateString) =>
    new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <div>
      {/* Hero */}
      <div
        style={{
          backgroundImage: `url(${landingImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '94vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 80px',
        }}
      >
        <div style={{ maxWidth: 580}}>
          <h1 style={{ fontSize: '25px', color: '#fff' }}>
            Hai! Selamat datang di
          </h1>
          <Title level={1} className="gradient-title" style={{ fontSize: '70px', color: '#ec407a' }}>
            Curhat.<span style={{ color: "#fff" }}>in</span>
          </Title>
          <Paragraph style={{ fontSize: '18px', color: '#fff', lineHeight: 1.8 }}>
            Platform aman dan nyaman untuk berbagi cerita, mendapatkan dukungan, dan menemukan informasi kesehatan mental. Kami di sini untuk kamu tanpa penilaian, hanya ruang untuk didengar.
          </Paragraph>
        </div>
      </div>

      {/* Tentang */}
      <div style={{ padding: '80px 100px' }}>
        <div data-aos="fade-up">
          <Title level={1} className="gradient-title" style={{ fontSize: '70px', color: '#ec407a', textAlign: 'center' }}>
            Curhat.in
          </Title>
        </div>
        <div data-aos="fade-up" style={{ padding: '0 80px', textAlign: 'center' }}>
          <Paragraph style={{ fontSize: '18px', lineHeight: 1.8, maxWidth: 1200, margin: '0 auto' }}>
            <strong>Selamat datang di <span style={{ color: '#ec407a' }}>Curhat.in.com</span></strong> — tempat aman di mana kamu bisa menjadi diri sendiri, tanpa takut <strong>dihakimi.</strong><br /><br />
            Kami menyediakan ruang yang ramah dan terbuka bagi siapa pun yang butuh tempat untuk berbagi, didengarkan, atau belajar. Baik melalui curhat pribadi dengan pendengar, diskusi di forum, maupun informasi seminar dan webinar — kami ingin kamu tahu satu hal:
          </Paragraph>
          <Paragraph data-aos="zoom-in" style={{ padding: '20px 0px', fontSize: '18px', lineHeight: 1.8, maxWidth: 800, margin: '0 auto' }}>
            <em><strong>Kamu tidak sendiri. Dan kamu layak untuk didengar.</strong></em>
          </Paragraph>
        </div>

        {/* Fitur */}
        <Row gutter={[32, 32]} style={{ padding: '60px 0px' }}>
          <Col xs={24} md={12} data-aos="fade-right">
            <Card className="feature-card" bordered={false}>
              <Space align="start" size={20}>
                <div className="icon-wrapper">
                  <CalendarOutlined className="feature-icon" />
                </div>
                <Paragraph className="feature-text">
                  Mengakses informasi seputar seminar dan webinar, yang membahas topik-topik penting tentang kesehatan mental, pengembangan diri, hingga strategi menghadapi tantangan hidup.
                </Paragraph>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={12} data-aos="fade-left">
            <Card className="feature-card" bordered={false}>
              <Space align="start" size={20}>
                <div className="icon-wrapper">
                  <MessageOutlined className="feature-icon" />
                </div>
                <Paragraph className="feature-text">
                  Bergabung dalam forum diskusi untuk bertukar pikiran, berbagi pengalaman, dan saling menguatkan. Karena kamu tidak harus merasa sendirian.
                </Paragraph>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={{ span: 12, offset: 6 }} data-aos="fade-up">
            <Card className="feature-card" bordered={false}>
              <Space align="start" size={20}>
                <div className="icon-wrapper">
                  <SmileOutlined className="feature-icon" />
                </div>
                <Paragraph className="feature-text">
                  Curhat secara pribadi kepada pendengar profesional maupun relawan yang siap mendengarkan dengan empati. Tanpa penilaian, tanpa tekanan.
                </Paragraph>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Forum */}
      <div style={{ backgroundColor: '#ffffff', padding: '0 20px' }}>
        <Row justify="center">
          <Col xs={24} md={20}>
            <Row justify="space-between">
              <div style={{ marginBottom: 24 }}>
                <Title level={3} style={{ color: '#ec407a' }}>Forum Diskusi</Title>
                <div style={{ height: 3, width: 120, backgroundColor: '#ec407a', borderRadius: 6 }} />
              </div>
              <Button type="primary" onClick={() => navigate('/forum')} style={{ backgroundColor: '#ec407a', borderColor: '#ec407a' }}>
                Buat Forum Kalian
              </Button>
            </Row>
            <Card style={{ borderRadius: 12 }}>
              {forums.length === 0 ? (
                <Paragraph>Tidak ada forum saat ini.</Paragraph>
              ) : (
                forums.slice(0, 3).map((forum) => (
                  <Card key={forum.id} type="inner" title={forum.title} style={{ marginBottom: 16 }}>
                    <Paragraph ellipsis={{ rows: 2 }}>{forum.content}</Paragraph>
                    <Paragraph type="secondary">Dibuat oleh: {forum.username || "Anonim"}</Paragraph>
                  </Card>
                ))
              )}
            </Card>
          </Col>
        </Row>
      </div>

      {/* Seminar */}
      <div style={{ backgroundColor: '#ffffff', padding: '40px 20px' }}>
        <Row justify="center">
          <Col xs={24} md={20}>
            <Row justify="space-between">
              <div style={{ marginBottom: 24 }}>
                <Title level={3} style={{ color: '#ec407a' }}>Informasi Seminar / Webinar</Title>
                <div style={{ height: 3, width: 120, backgroundColor: '#ec407a', borderRadius: 6 }} />
              </div>
              <Button type="primary" onClick={() => navigate('/seminar')} style={{ backgroundColor: '#ec407a', borderColor: '#ec407a' }}>
                Lihat Semua
              </Button>
            </Row>
            <Card style={{ borderRadius: 12 }}>
              {loadingSeminars ? (
                <Spin />
              ) : seminars.length === 0 ? (
                <Paragraph>Tidak ada seminar tersedia saat ini.</Paragraph>
              ) : (
                seminars.map((item) => (
                  <Card key={item.id} type="inner" style={{ marginBottom: 16 }}>
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

      {/* Ajakan Curhat */}
      <div style={{ backgroundColor: '#fff0f5', padding: '60px 20px', textAlign: 'center' }}>
        <Title level={3} style={{ color: '#ec407a' }}>Tertarik untuk didengar?</Title>
        <Paragraph style={{ marginBottom: 24 }}>
          Pendengar kami siap mendengar cerita kamu dengan empati dan tanpa menghakimi.
        </Paragraph>
        <Button size="large" style={{ backgroundColor: '#ec407a', color: '#fff' }} onClick={() => navigate('/curhat')}>
          Curhat Sekarang!
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
