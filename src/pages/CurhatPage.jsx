import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  Tag,
  message,
  Avatar,
  Button,
  Row,
  Col,
  Skeleton
} from 'antd';
import { UserOutlined, WhatsAppOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const CurhatPage = () => {
  const [listeners, setListeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupListener, setPopupListener] = useState(null);


  useEffect(() => {
    fetchListeners();
  }, []);

  const fetchListeners = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/v1/pendengar');
      const data = await response.json();
      setListeners(data.data || []);
    } catch (error) {
      console.error(error);
      message.error('Gagal mengambil data pendengar.');
    } finally {
      setLoading(false);
    }
  };

  const handleCurhat = (listener) => {
    if (!listener.number) {
      alert('Nomor WhatsApp tidak tersedia.');
      return;
    }
    setPopupListener(listener);
  };
  const confirmCurhat = () => {
  const phoneNumber = popupListener.number.replace(/\D/g, '');
  const messageText = encodeURIComponent(
    'Halo saya ingin curhat, saya mendapat nomor telepon anda dari website Curhat.in.com'
  );
  const waUrl = `https://wa.me/${phoneNumber}?text=${messageText}`;
  window.open(waUrl, '_blank');
  setPopupListener(null); // Tutup popup
};

const cancelCurhat = () => {
  setPopupListener(null);
};


  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#fafafa',
        padding: '24px 80px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ marginBottom: 8, fontFamily: 'Poppins', color: '#ec407a' }}>
            Curahkan Hatimu dengan pendengar kami!
        </Title>
      <div style={{ height: 3, width: 120, backgroundColor: '#ec407a', borderRadius: 6 }} />
    </div>
      <Card
        bordered={false}
        style={{
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          backgroundColor: '#fff'
        }}
      >
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Card
              key={index}
              style={{
                marginBottom: 24,
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              <Skeleton active avatar paragraph={{ rows: 3 }} />
            </Card>
          ))
        ) : (

          <Row gutter={[24, 24]}>
            {listeners.map((item) => (
              <Col xs={24} sm={12} md={8} key={item.id}>
                <Card
                  hoverable
                  style={{
                    borderRadius: 10,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                    <Avatar
                      size={48}
                      icon={<UserOutlined />}
                      style={{ backgroundColor: '#ec407a', marginRight: 12 }}
                    />
                    <div>
                      <Title level={5} style={{ margin: 0 }}>{item.name}</Title>
                      <Tag color={item.available ? 'green' : 'red'}>
                        {item.available ? 'Tersedia' : 'Tidak Tersedia'}
                      </Tag>
                    </div>
                  </div>

                  <Paragraph><strong>Bio:</strong> {item.bio}</Paragraph>

                  <div style={{ marginTop: 'auto' }}>
                    <Button
                      type="primary"
                      icon={<WhatsAppOutlined />}
                      onClick={() => handleCurhat(item)}
                      disabled={!item.available}
                      style={{
                        width: '100%',
                        backgroundColor: item.available ? '#ec407a' : '#ccc',
                        borderColor: item.available ? '#ec407a' : '#ccc',
                        color: '#fff'
                      }}
                    >
                      Curhat Sekarang
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card>
      {popupListener && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#fff', borderRadius: 12,
            padding: 24, width: '90%', maxWidth: 400,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <Title level={4} style={{ marginBottom: 12, color: '#ec407a' }}>Buka WhatsApp?</Title>
            <Paragraph>
              Kamu akan diarahkan ke WhatsApp untuk mulai curhat dengan <strong>{popupListener.name}</strong>.
            </Paragraph>
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 12 }}>
              <Button onClick={cancelCurhat}>Batal</Button>
              <Button type="primary" onClick={confirmCurhat} style={{ backgroundColor: '#ec407a', borderColor: '#ec407a' }}>
                Lanjutkan
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CurhatPage;
