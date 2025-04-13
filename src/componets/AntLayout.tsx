"use client";

import { Layout, Menu } from "antd";
import { AppstoreOutlined, FileTextOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const { Header, Sider, Content } = Layout;

export default function AntLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  // ✅ Solución: esperar a que se monte el layout para evitar flash feo
  useEffect(() => {
    const timeout = setTimeout(() => setIsReady(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  if (!isReady) {
    return <div style={{ visibility: "hidden", height: "100vh" }} />;
  }

  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Sider width={220} style={{ background: "#001529" }}>
        <div
          style={{
            color: "white",
            padding: 20,
            fontWeight: "bold",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          A&S LA REDOMA
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname === "/registrar" ? "2" : "1"]}
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

      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            background: "#f6f627",
            padding: "0 20px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            height: 64,
          }}
        >
          <span className="font-semibold text-black">
            Cenon Rojas · cenonrojas57@gmail.com
          </span>
        </Header>

        <Content
          style={{
            padding: 24,
            background: "#fff",
            height: "calc(100vh - 64px)",
            overflow: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
