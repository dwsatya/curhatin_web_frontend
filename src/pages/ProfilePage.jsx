import React, { useEffect, useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  message,
  Skeleton,
  Typography,
  notification,
} from 'antd';

const { Title } = Typography;

const ProfilePage = () => {
  const userId = localStorage.getItem('user_id');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (!userId) {
      message.error("User belum login.");
      return;
    }
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/v1/users/${userId}`);
      if (!res.ok) throw new Error("User tidak ditemukan");
      const result = await res.json();
      form.setFieldsValue(result.data);
    } catch (err) {
      message.error("Gagal memuat data pengguna.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    const {
      passwordBaru,
      konfirmasiPasswordBaru,
      passwordSekarang,
      ...userFields
    } = values;

    if (!passwordSekarang) {
      message.error("Password saat ini wajib diisi untuk konfirmasi.");
      return;
    }

    if (passwordBaru && passwordBaru !== konfirmasiPasswordBaru) {
      message.error("Password baru dan konfirmasi tidak cocok.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...userFields,
        current_password: passwordSekarang,
      };

      if (passwordBaru) {
        payload.password = passwordBaru;
      }

      const res = await fetch(`http://localhost:5000/api/v1/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          api.error({
            message: 'Password Salah',
            description:
              'Password saat ini yang kamu masukkan salah. Silakan coba lagi.',
          });
        } else {
          message.error(result.message || 'Update gagal.');
        }
        return;
      }

      message.success("Profil berhasil diperbarui.");

      api.success({
        message: 'Berhasil',
        description: 'Profil kamu berhasil diperbarui.',
      });

      form.setFieldsValue({
        passwordBaru: '',
        konfirmasiPasswordBaru: '',
        passwordSekarang: '',
      });
    } catch (err) {
      message.error("Gagal memperbarui profil.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Card
        style={{
          maxWidth: 500,
          margin: '40px auto',
          padding: 24,
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Title
          level={3}
          style={{
            textAlign: 'center',
            marginBottom: 24,
            fontFamily: 'Poppins, sans-serif',
            color: '#ec407a',
          }}
        >
          Profil Pengguna
        </Title>

        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : (
          <Form form={form} layout="vertical" onFinish={handleUpdate}>
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: "Username wajib diisi" }]}
            >
              <Input placeholder="Masukkan username" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Email wajib diisi" },
                { type: 'email', message: "Format email tidak valid" },
              ]}
            >
              <Input placeholder="Masukkan email" />
            </Form.Item>

            <Form.Item
              name="passwordBaru"
              label="Password Baru"
              extra="Isi jika ingin mengganti password"
            >
              <Input.Password placeholder="Password baru (opsional)" />
            </Form.Item>

            <Form.Item
              name="konfirmasiPasswordBaru"
              label="Konfirmasi Password Baru"
              dependencies={['passwordBaru']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !getFieldValue('passwordBaru') ||
                      getFieldValue('passwordBaru') === value
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Konfirmasi password tidak cocok")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Ulangi password baru" />
            </Form.Item>

            <Form.Item
              name="passwordSekarang"
              label="Password Saat Ini"
              rules={[
                { required: true, message: "Password saat ini wajib diisi" },
              ]}
            >
              <Input.Password placeholder="Masukkan password saat ini untuk konfirmasi" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={saving}
                style={{
                  width: '100%',
                  borderRadius: 6,
                  backgroundColor: '#ec407a',
                }}
              >
                Simpan Perubahan
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </>
  );
};

export default ProfilePage;
