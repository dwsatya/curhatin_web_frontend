import React from "react";
import { Layout } from "antd";
import Navbar from "./NavBar";
import Footer from "./Footer";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />

      <Content
        style={{
          width: "100%",
          background: "#fff",
        }}
      >
        {children}
      </Content>

      <Footer />
    </Layout>
  );
};

export default MainLayout;
