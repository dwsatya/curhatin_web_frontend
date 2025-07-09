import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Input, Typography, List, message, Skeleton, notification } from 'antd';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const ForumPage = () => {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedForum, setSelectedForum] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentForm] = Form.useForm();
  const [form] = Form.useForm();
  const [editForum, setEditForum] = useState(null);

  const [api, contextHolder] = notification.useNotification();

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);


  const fetchForums = () => {
    setLoading(true);
    fetch(`${apiUrl}/api/v1/thread`)
      .then((res) => res.json())
      .then((data) => {
        const threadData = Array.isArray(data.threads) ? data.threads : [];
        setForums(threadData);
      })
      .catch(() => message.error("Gagal memuat forum"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchForums();
  }, []);

  const loadComments = (forum) => {
    if (selectedForum?.id === forum.id) {
      setSelectedForum(null);
      setComments([]);
      return;
    }

    fetch(`${apiUrl}/api/v1/thread/${forum.id}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(Array.isArray(data.comments) ? data.comments : []);
        setSelectedForum(forum);
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
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error?.message || "Gagal");
        }
        return res.json();
      })
      .then(() => {
        api.success({
          message: 'Forum Berhasil Ditambahkan',
          description: 'Forum kamu berhasil ditambahkan ke daftar.',
        });
        fetchForums();
        form.resetFields();
      })
      .catch((err) => {
        message.error(`Gagal (${err.message})`);
      })
      .finally(() => setLoading(false));
  };

  const handleUpdateForum = (values) => {
    if (!editForum?.id) return;

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);

    fetch(`${apiUrl}/api/v1/thread/${editForum.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        api.success({
          message: 'Forum Diperbarui',
          description: 'Forum kamu berhasil diperbarui.',
        });
        fetchForums();
        form.resetFields();
        setEditForum(null);
      })
      .catch(() => message.error("Gagal memperbarui forum"));
  };

  const handleAddComment = (values) => {
    if (!selectedForum?.id) return message.error("Forum tidak valid");

    const formData = new FormData();
    formData.append("content", values.comment);

    fetch(`${apiUrl}/api/v1/thread/${selectedForum.id}/comment`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) throw new Error(data.message || "Gagal");
        api.success({
          message: 'Komentar Ditambahkan',
          description: 'Komentar kamu berhasil dikirim.',
        });
        setComments((prev) => [...prev, { id: Date.now(), content: values.comment, username: "Anda" }]);
        commentForm.resetFields();
      })
      .catch((err) => message.error(err.message || "Gagal menambahkan komentar"));
  };

  const handleEdit = (forum, e) => {
    e.stopPropagation();
    setEditForum(forum);
    form.setFieldsValue({ title: forum.title, content: forum.content });
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setDeleteTargetId(id);
    setShowDeletePopup(true);
  };


const confirmDelete = () => {
  if (!deleteTargetId) return;

  fetch(`${apiUrl}/api/v1/thread/${deleteTargetId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menghapus");
      return data;
    })
    .then(() => {
      api.success({
        message: 'Forum Dihapus',
        description: 'Forum berhasil dihapus dari daftar.',
      });
      fetchForums();
      if (selectedForum?.id === deleteTargetId) {
        setSelectedForum(null);
        setComments([]);
      }
    })
    .catch((err) => {
      message.error(err.message || "Gagal menghapus forum");
    })
    .finally(() => {
      setShowDeletePopup(false);
      setDeleteTargetId(null);
    });
};

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setDeleteTargetId(null);
  };


  const renderForumList = (forumList) =>
    forumList.map((item, index) => (
      <div key={item.id || `${item.title}-${index}`} style={{ marginBottom: 24 }}>
        <Card
          title={<Text strong>{item.title}</Text>}
          onClick={() => loadComments(item)}
          hoverable
          style={{
            cursor: "pointer",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Paragraph ellipsis={{ rows: 2 }}>{item.content}</Paragraph>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
            <Text type="secondary">👤 {item.username || "Anonim"}</Text>
            <Text type="secondary">{item.created_at}</Text>
          </div>
        </Card>

        {item.user_id == userId && (
          <div style={{ marginTop: 12, textAlign: 'right' }}>
            <Button size="small" style={{ marginRight: 8 }} onClick={(e) => handleEdit(item, e)}>
              Edit
            </Button>
            <Button size="small" danger onClick={(e) => handleDelete(item.id, e)}>
              Hapus
            </Button>
          </div>
        )}

        {selectedForum?.id === item.id && (
          <Card title="Komentar" style={{ marginTop: 12 }}>
            <List
              dataSource={comments}
              locale={{ emptyText: "Belum ada komentar." }}
              renderItem={(komentar, idx) => (
                <List.Item key={komentar.id || idx}>
                  <List.Item.Meta title={komentar.username || "Anonim"} description={komentar.content} />
                </List.Item>
              )}
            />
            <Form form={commentForm} layout="vertical" onFinish={handleAddComment} style={{ marginTop: 16 }}>
              <Form.Item
                label="Komentar"
                name="comment"
                rules={[{ required: true, message: "Komentar tidak boleh kosong" }]}
              >
                <TextArea rows={3} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ backgroundColor: '#ec407a' }}>Kirim Komentar</Button>
              </Form.Item>
            </Form>
          </Card>
        )}
      </div>
    ));

  const forumSaya = forums.filter((f) => f.user_id == userId);
  const forumLain = forums.filter((f) => f.user_id != userId);

  return (
    <>
      {contextHolder}
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Form Buat/Edit Forum */}
        <div style={{ width: "30%", padding: 24, borderRight: "1px solid #f0f0f0", overflow: "auto" }}>
          <div style={{ marginBottom: 24 }}>
            <Title level={3} style={{ marginBottom: 8, fontFamily: 'Poppins', color: '#ec407a' }}>
              {editForum ? "Edit Forum" : "Tambah Forum Diskusi"}
            </Title>
            <div style={{ height: 3, width: 120, backgroundColor: '#ec407a', borderRadius: 6 }} />
          </div>
          <Card>
            <Form
              layout="vertical"
              onFinish={editForum ? handleUpdateForum : handleAddForum}
              form={form}
            >
              <Form.Item
                label="Judul Forum"
                name="title"
                rules={[{ required: true, message: "Judul wajib diisi" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Isi Forum"
                name="content"
                rules={[{ required: true, message: "Isi wajib diisi" }]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#ec407a' }}>
                  {editForum ? "Update Forum" : "Tambah Forum"}
                </Button>
                {editForum && (
                  <Button style={{ marginLeft: 8 }} onClick={() => {
                    setEditForum(null);
                    form.resetFields();
                  }}>
                    Batal
                  </Button>
                )}
              </Form.Item>
            </Form>
          </Card>
        </div>

        {/* List Forum */}
        <div style={{ width: "70%", padding: 24, overflowY: "auto", background: "#fafafa" }}>
          <div style={{ marginBottom: 24 }}>
            <Title level={3} style={{ marginBottom: 8, fontFamily: 'Poppins', color: '#ec407a' }}>
              Forum Diskusi
            </Title>
            <div style={{ height: 3, width: 120, backgroundColor: '#ec407a', borderRadius: 6 }} />
          </div>

          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <Card key={idx} style={{ marginBottom: 24, borderRadius: 12 }}>
                <Skeleton active paragraph={{ rows: 3 }} />
              </Card>
            ))
          ) : (
            <>
              {forumSaya.length > 0 && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{ width: 5, height: 24, backgroundColor: '#ec407a', borderRadius: 4, marginRight: 10 }} />
                    <Title level={4} style={{ margin: 0, fontFamily: 'Poppins', color: '#333' }}>
                      Forum yang Kamu Buat
                    </Title>
                  </div>
                  {renderForumList(forumSaya)}
                </>
              )}

              {forumLain.length > 0 && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{ width: 5, height: 24, backgroundColor: '#ec407a', borderRadius: 4, marginRight: 10 }} />
                    <Title level={4} style={{ margin: 0, fontFamily: 'Poppins', color: '#333' }}>
                      Forum Lainnya
                    </Title>
                  </div>
                  {renderForumList(forumLain)}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {showDeletePopup && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: 'white', padding: 24, borderRadius: 8, maxWidth: 400, textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: 16, color: '#000' }}>Yakin ingin menghapus forum ini?</h3>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button danger onClick={confirmDelete} style={{ marginRight: 12 }}>Hapus</Button>
              <Button onClick={cancelDelete}>Batal</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForumPage;
