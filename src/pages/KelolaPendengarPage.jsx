import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  List,
  Tag,
  Spin,
  Button,
  Form,
  Input,
  Switch,
  notification
} from 'antd';

const { Title, Paragraph } = Typography;

const KelolaPendengarPage = () => {
  const navigate = useNavigate();
  const [listeners, setListeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/v1/pendengar');
      const data = await response.json();
      setListeners(data.data || []);
    } catch (error) {
      console.error(error);
      api.error({
        message: 'Gagal Mengambil Data',
        description: 'Tidak dapat mengambil daftar pendengar. Periksa koneksi atau server API.',
      });
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const payload = {
      ...values,
      number: `62${values.number}`,
      created_by: user.user_id || 'admin',
    };

    try {
      const response = await fetch(
        editing
          ? `http://localhost:5000/api/v1/pendengar/${editing.id}`
          : 'http://localhost:5000/api/v1/pendengar',
        {
          method: editing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        api.success({
          message: editing ? 'Pendengar Diperbarui' : 'Pendengar Ditambahkan',
          description: editing
            ? 'Data pendengar berhasil diperbarui.'
            : 'Pendengar baru berhasil disimpan ke dalam sistem.',
        });
        form.resetFields();
        setEditing(null);
        fetchData();
      } else {
        api.error({
          message: editing ? 'Gagal Mengedit Pendengar' : 'Gagal Menambahkan Pendengar',
          description: 'Terjadi kesalahan saat menyimpan data. Silakan coba lagi.',
        });
      }
    } catch (error) {
      console.error(error);
      api.error({
        message: editing ? 'Kesalahan Edit Data' : 'Kesalahan Tambah Data',
        description: 'Terjadi error tak terduga. Periksa koneksi atau server.',
      });
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    form.setFieldsValue({
      name: item.name,
      bio: item.bio,
      number: item.number?.startsWith('62') ? item.number.slice(2) : item.number,
      available: item.available,
    });
  };

  const handleDelete = (item) => {
    setConfirmDelete(item);
  };

  const confirmDeleteAction = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/pendengar/${confirmDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        api.success({
          message: 'Pendengar Dihapus',
          description: `Pendengar "${confirmDelete.name}" berhasil dihapus dari sistem.`,
        });
        fetchData();
      } else {
        api.error({
          message: 'Gagal Menghapus Pendengar',
          description: 'Penghapusan gagal dilakukan. Coba ulangi lagi.',
        });
      }
    } catch (error) {
      console.error(error);
      api.error({
        message: 'Kesalahan Saat Menghapus',
        description: 'Terjadi kesalahan saat menghapus pendengar.',
      });
    } finally {
      setConfirmDelete(null);
    }
  };

  const cancelDeleteAction = () => {
    setConfirmDelete(null);
  };

  const resetForm = () => {
    form.resetFields();
    setEditing(null);
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {contextHolder}

      <div style={{ width: "30%", padding: 24, borderRight: "1px solid #f0f0f0" }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={3} style={{ marginBottom: 8, fontFamily: 'Poppins', color: '#ec407a' }}>
            {editing ? "Edit Pendengar" : "Tambah Pendengar"}
          </Title>
          <div style={{ height: 3, width: 120, backgroundColor: '#ec407a', borderRadius: 6 }} />
        </div>
        <Card title={editing ? 'Edit Pendengar' : 'Tambah Pendengar'}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ available: true }}
          >
            <Form.Item
              name="name"
              label="Nama"
              rules={[{ required: true, message: 'Masukkan nama' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="bio"
              label="Bio"
              rules={[{ required: true, message: 'Masukkan bio' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="number"
              label="Nomor WhatsApp"
              rules={[
                { required: true, message: 'Masukkan nomor WhatsApp' },
                { pattern: /^[0-9]{8,}$/, message: 'Minimal 8 digit tanpa 0 di depan' },
              ]}
            >
              <Input addonBefore="+62" />
            </Form.Item>
            <Form.Item
              name="available"
              label="Tersedia"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: '#ec407a' }}>
                {editing ? 'Simpan Perubahan' : 'Tambah'}
              </Button>
              {editing && (
                <Button onClick={resetForm} danger>
                  Batal Edit
                </Button>
              )}
            </div>
          </Form>
        </Card>
      </div>

      <div style={{ width: "70%", padding: 24, overflowY: "auto", background: "#fafafa" }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={3} style={{ marginBottom: 8, fontFamily: 'Poppins', color: '#ec407a' }}>
            List Pendengar
          </Title>
          <div style={{ height: 3, width: 120, backgroundColor: '#ec407a', borderRadius: 6 }} />
        </div>
        <Card title="Daftar Pendengar" style={{ minHeight: 300 }}>
          {loading ? (
            <Spin />
          ) : (
            <List
              itemLayout="vertical"
              dataSource={listeners}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <Card
                    title={item.name}
                    actions={[
                      <Button type="link" onClick={() => handleEdit(item)}>Edit</Button>,
                      <Button type="link" danger onClick={() => handleDelete(item)}>Hapus</Button>
                    ]}
                  >
                    <p><strong>Bio:</strong> {item.bio}</p>
                    <p><strong>No. WhatsApp:</strong> +{item.number}</p>
                    <p><strong>Dibuat oleh:</strong> {item.created_by}(admin)</p>
                    <p><strong>Tanggal:</strong> {new Date(item.created_at).toLocaleString()}</p>
                    <Tag color={item.available ? 'green' : 'red'}>
                      {item.available ? 'Tersedia' : 'Tidak Tersedia'}
                    </Tag>
                  </Card>
                </List.Item>
              )}
            />
          )}
        </Card>
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
              Hapus Pendengar?
            </Title>
            <Paragraph>
              Kamu akan menghapus pendengar bernama <strong>{confirmDelete.name}</strong>. Lanjutkan?
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
    </div>
  );
};

export default KelolaPendengarPage;
