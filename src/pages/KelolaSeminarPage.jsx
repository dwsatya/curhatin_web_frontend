import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  List,
  Spin,
  Image,
  Form,
  Input,
  Button,
  DatePicker,
  notification,
  Modal,
} from 'antd';
import dayjs from 'dayjs';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const KelolaSeminarPage = () => {
  const navigate = useNavigate();
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [editingSeminar, setEditingSeminar] = useState(null);
  const [apiNotif, contextHolder] = notification.useNotification();
  const [confirmDelete, setConfirmDelete] = useState(null);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/');
    } else {
      fetchSeminars();
    }
  }, [navigate]);

  const fetchSeminars = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/seminar');
      const data = await response.json();
      setSeminars(data.data || []);
    } catch (error) {
      console.error(error);
      showNotif('error', 'Gagal', 'Gagal mengambil data seminar.');
    } finally {
      setLoading(false);
    }
  };

  const showNotif = (type, title, desc) => {
    apiNotif[type]({
      message: title,
      description: desc,
      placement: 'topRight',
    });
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const body = {
      title: values.title,
      description: values.description,
      date: values.date ? values.date.format('YYYY-MM-DD') : null,
      location: values.location,
      created_by: String(user.user_id),
      image_url: values.image_url,
      registration_url: values.registration_url || '',
    };

    try {
      const url = editingSeminar
        ? `http://localhost:5000/api/v1/seminar/${editingSeminar.id}`
        : 'http://localhost:5000/api/v1/seminar';
      const method = editingSeminar ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Gagal menyimpan seminar');

      showNotif(
        'success',
        editingSeminar ? 'Berhasil Diedit' : 'Berhasil Ditambahkan',
        editingSeminar
          ? 'Data seminar berhasil diperbarui.'
          : 'Seminar baru berhasil ditambahkan.'
      );
      form.resetFields();
      setEditingSeminar(null);
      fetchSeminars();
    } catch (error) {
      console.error(error);
      showNotif('error', 'Gagal', 'Gagal menyimpan seminar.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (item) => {
    setConfirmDelete(item); 
  };

  const confirmDeleteAction = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/seminar/${confirmDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showNotif('success', 'Seminar Dihapus', `"${confirmDelete.title}" telah dihapus.`);
        fetchSeminars(); 
      } else {
        showNotif('error', 'Gagal Menghapus Seminar', 'Terjadi kesalahan saat menghapus seminar.');
      }
    } catch (error) {
      console.error(error);
      showNotif('error', 'Error Server', 'Periksa koneksi atau server API.');
    } finally {
      setConfirmDelete(null);
    }
  };

  const cancelDeleteAction = () => {
    setConfirmDelete(null);
  };


  const formatDateIndo = (dateString) => {
    if (!dateString) return '';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('id-ID', options).format(new Date(dateString));
  };

  const handleEdit = (seminar) => {
    setEditingSeminar(seminar);
    form.setFieldsValue({
      title: seminar.title,
      description: seminar.description,
      date: dayjs(seminar.date),
      location: seminar.location,
      image_url: seminar.image_url,
      registration_url: seminar.registration_url,
    });
  };

  const handleCancelEdit = () => {
    setEditingSeminar(null);
    form.resetFields();
  };

  return (
    <>
      {contextHolder}
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Form Tambah/Edit */}
        <div style={{ width: "30%", padding: 24, borderRight: "1px solid #f0f0f0" }}>
          <div style={{ marginBottom: 24 }}>
            <Title level={3} style={{ marginBottom: 8, fontFamily: 'Poppins', color: '#ec407a' }}>
              {editingSeminar ? "Edit Seminar" : "Tambah Seminar"}
            </Title>
            <div style={{ height: 3, width: 120, backgroundColor: '#ec407a', borderRadius: 6 }} />
          </div>

          <Card bordered style={{ borderRadius: 12 }}>
            <Form layout="vertical" form={form} onFinish={handleSubmit}>
              <Form.Item
                label="Judul Seminar"
                name="title"
                rules={[{ required: true, message: 'Judul wajib diisi' }]}
              >
                <Input placeholder="Masukkan judul seminar" />
              </Form.Item>

              <Form.Item
                label="Deskripsi"
                name="description"
                rules={[{ required: true, message: 'Deskripsi wajib diisi' }]}
              >
                <TextArea rows={4} placeholder="Masukkan deskripsi" />
              </Form.Item>

              <Form.Item
                label="Tanggal"
                name="date"
                rules={[{ required: true, message: 'Tanggal wajib diisi' }]}
              >
                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" allowClear={false} />
              </Form.Item>

              <Form.Item
                label="Lokasi"
                name="location"
                rules={[{ required: true, message: 'Lokasi wajib diisi' }]}
              >
                <Input placeholder="Contoh: Zoom, Jakarta, dll" />
              </Form.Item>

              <Form.Item
                label="URL Gambar"
                name="image_url"
                rules={[{ required: true, message: 'URL Gambar wajib diisi' }]}
              >
                <Input placeholder="https://example.com/image.jpg" />
              </Form.Item>

              <Form.Item label="URL Pendaftaran (opsional)" name="registration_url">
                <Input placeholder="https://forms.gle/xxxx" />
              </Form.Item>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button type="primary" htmlType="submit" style={{ backgroundColor: '#ec407a' }} loading={submitting}>
                  {editingSeminar ? 'Simpan Perubahan' : 'Tambah'}
                </Button>
                {editingSeminar && (
                  <Button onClick={handleCancelEdit} danger>
                    Batal Edit
                  </Button>
                )}
              </div>
            </Form>
          </Card>
        </div>

        {/* Daftar Seminar */}
        <div style={{ width: "70%", padding: 24, overflowY: "auto", background: "#fafafa" }}>
          <div style={{ marginBottom: 24 }}>
            <Title level={3} style={{ marginBottom: 8, fontFamily: 'Poppins', color: '#ec407a' }}>
              List Seminar
            </Title>
            <div style={{ height: 3, width: 120, backgroundColor: '#ec407a', borderRadius: 6 }} />
          </div>

          <Card bordered style={{ borderRadius: 12 }}>
            {loading ? (
              <div style={{ textAlign: 'center', marginTop: 40 }}>
                <Spin size="large" />
              </div>
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
                        <Text strong>Tanggal:</Text> <Text>{formatDateIndo(item.date)}</Text><br />
                        <Text strong>Lokasi:</Text> <Text>{item.location}</Text><br />
                        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                          <Button type="link" onClick={() => handleEdit(item)}>
                            Edit
                          </Button>
                          <Button type="link" danger onClick={() => handleDelete(item)}>
                            Hapus
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              />
            )}
          </Card>
        </div>
      </div>
      {confirmDelete && (
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
            <Title level={4} style={{ marginBottom: 12, color: '#ec407a' }}>
              Hapus Seminar?
            </Title>
            <Paragraph>
              Kamu akan menghapus seminar berjudul <strong>{confirmDelete.title}</strong>. Lanjutkan?
            </Paragraph>
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 12 }}>
              <Button onClick={cancelDeleteAction}>Batal</Button>
              <Button type="primary" danger onClick={confirmDeleteAction}>
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KelolaSeminarPage;
