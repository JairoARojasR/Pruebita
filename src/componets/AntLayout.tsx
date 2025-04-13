"use client";

import { Layout, Menu } from "antd";
import { AppstoreOutlined, FileTextOutlined } from "@ant-design/icons";
import Link from "next/link";
import "antd/dist/reset.css";

const { Header, Sider, Content } = Layout;

export default function AntLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={220} style={{ background: "#001529" }}>
        <div style={{ color: "white", padding: 20, fontWeight: "bold", fontSize: 16 }}>
          A&S LA REDOMA
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <AppstoreOutlined />,
              label: <Link href="/">Dashboard</Link>,
            },
            {
              key: "2",
              icon: <FileTextOutlined />,
              label: <Link href="/registrar">Registrar</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#f6f627",
            padding: "0 20px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <span className="font-semibold">Cenon Rojas · cenonrojas57@gmail.com</span>
        </Header>
        <Content style={{ margin: 24, padding: 24, background: "#fff" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
