import React, { useEffect, useState } from 'react';
import { Typography, Card, List, message, Image, Button, Skeleton } from 'antd';

const { Title, Paragraph, Text } = Typography;

const SeminarPage = () => {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);


  useEffect(() => {
    fetchSeminars();
  }, []);

  const fetchSeminars = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/seminar');
      const data = await response.json();
      setSeminars(data.data || []);
    } catch (error) {
      console.error(error);
      message.error('Gagal mengambil data seminar.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = (seminar) => {
    setSelectedSeminar(seminar);
    setShowConfirm(true);
  };
  const confirmRegister = () => {
  if (selectedSeminar?.registration_url) {
    window.open(selectedSeminar.registration_url, '_blank');
  }
  setShowConfirm(false);
  setSelectedSeminar(null);
};

  const cancelRegister = () => {
    setShowConfirm(false);
    setSelectedSeminar(null);
  };


  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        padding: '24px 80px',
        boxSizing: 'border-box',
        backgroundColor: '#fafafa'
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ marginBottom: 8, fontFamily: 'Poppins', color: '#ec407a' }}>
            Informasi Seminar / Webinar 
        </Title>
      <div style={{ height: 3, width: 120, backgroundColor: '#ec407a', borderRadius: 6 }} />
    </div>
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

        <List
          itemLayout="vertical"
          size="large"
          dataSource={seminars}
          renderItem={(item) => (
            <Card
              key={item.id}
              style={{
                marginBottom: 24,
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: 20,
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}
              >
                {item.image_url && (
                  <Image
                    alt="gambar seminar"
                    src={item.image_url}
                    width={180}
                    height={180}
                    style={{ objectFit: 'cover', borderRadius: 10 }}
                    preview={false}
                  />
                )}

                <div style={{ flex: 1 }}>
                  <Title level={4} style={{ marginBottom: 8 }}>
                    {item.title}
                  </Title>
                  <Paragraph style={{ marginBottom: 12 }}>
                    {item.description}
                  </Paragraph>
                  <Text strong>Tanggal:</Text>{' '}
                  <Text>{new Date(item.date).toLocaleDateString()}</Text>
                  <br />
                  <Text strong>Lokasi:</Text> <Text>{item.location}</Text>
                  <br />
                  {item.registration_url && (
                    <Button
                      type="primary"
                      onClick={() => handleRegisterClick(item)}
                      style={{ marginTop: 12, backgroundColor: '#ec407a', borderColor: '#ec407a' }}
                    >
                      Daftar Sekarang
                    </Button>

                  )}
                </div>
              </div>
            </Card>
          )}
        />
      )}
      {showConfirm && selectedSeminar && (
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
            <Title level={4} style={{ marginBottom: 12, color: '#ec407a' }}>Ingin mendaftar sekarang?</Title>
            <Paragraph>
              Kamu akan diarahkan ke halaman pendaftaran untuk seminar <strong>{selectedSeminar.title}</strong>.
            </Paragraph>
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 12 }}>
              <Button onClick={cancelRegister}>Batal</Button>
              <Button type="primary" onClick={confirmRegister} style={{ backgroundColor: '#ec407a', borderColor: '#ec407a' }}>
                Lanjutkan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeminarPage;
