import React from 'react';
import { Layout, Typography, Space } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const Footer = () => {
  return (
    <AntFooter style={{ backgroundColor: '#fff', padding: '20px 0', borderTop: '1px solid #e8e8e8' }}>
      <div style={{ textAlign: 'center' }}>
        <Space direction="vertical" size={4}>
          <Text strong style={{ fontSize: 16, color: '#333' }}>Curhat.in</Text>
          <Text style={{ color: '#666', fontSize: 13 }}>
            Tempat berbagi cerita tanpa rasa takut dihakimi
          </Text>
          <Text style={{ color: '#999', fontSize: 12 }}>
            Email: support@curhat.in &nbsp;|&nbsp; WhatsApp: 0812-3456-7890
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            ©2025 Curhat.in — All rights reserved.
          </Text>
        </Space>
      </div>
    </AntFooter>
  );
};

export default Footer;
