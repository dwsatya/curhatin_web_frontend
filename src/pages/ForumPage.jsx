import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Input, Typography, List, message } from 'antd';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const ForumPage = () => {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedForum, setSelectedForum] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentForm] = Form.useForm();
  const [form] = Form.useForm();

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const token = localStorage.getItem("token");



  useEffect(() => {
    fetch(`${apiUrl}/api/v1/thread`)
      .then((res) => res.json())
      .then((data) => setForums(Array.isArray(data.threads) ? data.threads : []))
      .catch(() => message.error("Gagal memuat forum"));
  }, []);

  const loadComments = (threadId) => {
    fetch(`${apiUrl}/api/v1/thread/${threadId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(Array.isArray(data.comments) ? data.comments : []);
        setSelectedForum(threadId);
      })
      .catch(() => message.error("Gagal memuat komentar"));
  };



const handleAddForum = (values) => {
  setLoading(true);

  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("content", values.content);

fetch(`${apiUrl}/api/v1/thread`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
})

    .then(async (res) => {
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || "Gagal");
      }
      return res.json();
    })
    .then((data) => {
      message.success("Forum berhasil ditambahkan!");
      setForums((prev) => [...prev, data]);
    })
    .catch((err) => {
      console.error("Error:", err);
      message.error(`Gagal (${err.message})`);
    })
    .finally(() => {
      setLoading(false);
    });
};


  // Handle add comment
  const handleAddComment = (values) => {
    const formData = new FormData();
    formData.append("content", values.comment);

    fetch(`${apiUrl}/api/v1/thread/${selectedForum}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json().then(data => ({ ok: res.ok, status: res.status, data })))
      .then(({ ok, status, data }) => {
        if (!ok) {
          throw new Error(data.message || `Gagal (${status})`);
        }
        message.success("Komentar ditambahkan");
        setComments(prev => [...prev, { id: Date.now(), content: values.comment, username: "Anda" }]);
        commentForm.resetFields();
      })
      .catch((err) => {
        console.error(err);
        message.error(err.message || "Gagal menambahkan komentar");
      });
  };

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <Title level={2}>Forum Diskusi</Title>

      {/* Form Buat Forum */}
      <Card title="Buat Forum Baru" style={{ marginBottom: 24 }}>
        <Form layout="vertical" onFinish={handleAddForum} form={form}>
          <Form.Item label="Judul Forum" name="title" rules={[{ required: true, message: "Judul wajib diisi" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Isi Forum" name="content" rules={[{ required: true, message: "Isi wajib diisi" }]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Tambah Forum
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Daftar Forum */}
      <List
        header={<b>Semua Forum</b>}
        dataSource={forums}
        renderItem={(item) => (
          <List.Item key={item.id} style={{ cursor: "pointer" }} onClick={() => loadComments(item.id)}>
            <List.Item.Meta
              title={<strong>{item.title}</strong>}
              description={<Paragraph ellipsis={{ rows: 2 }}>{item.content}</Paragraph>}
            />
          </List.Item>
        )}
      />

      {/* Komentar */}
      {selectedForum && (
        <Card title="Komentar" style={{ marginTop: 24 }}>
          <List
            dataSource={comments}
            locale={{ emptyText: "Belum ada komentar." }}
            renderItem={(item, index) => (
              <List.Item key={item.id || index}>
                <List.Item.Meta
                  title={item.username || "Anonim"}
                  description={item.content}
                />
              </List.Item>
            )}
          />
          <Form form={commentForm} layout="vertical" onFinish={handleAddComment} style={{ marginTop: 16 }}>
            <Form.Item label="Komentar" name="comment" rules={[{ required: true, message: "Komentar tidak boleh kosong" }]}>
              <TextArea rows={3} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Kirim Komentar
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default ForumPage;
