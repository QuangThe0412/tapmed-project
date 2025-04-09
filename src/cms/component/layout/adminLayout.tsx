import React, { ReactNode, useEffect } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { getChatMessageEndPoint } from "./adminEndpoint";
import { pathsAdmin } from "@src/utils/contanst";
import "./adminLayout.css";
import HeaderAdminLayout from "./header";

interface AdminLayoutProps {
  children: ReactNode;
}

const { Sider, Content } = Layout;

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchCheckAdmin = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found in local storage.");
        return;
      }

      const res = await getChatMessageEndPoint(accessToken);
      if (
        res &&
        typeof res === "string" &&
        res?.toLowerCase()?.includes("admin")
      ) {
        setIsAdmin(true);
      }
    };

    fetchCheckAdmin();
  }, [isAdmin]);

  if (!isAdmin) {
    return <div>You do not have permission to access this page.</div>;
  }

  const menuItems = pathsAdmin
    .filter((path) => path.isShowMenu)
    .map((path) => ({
      key: path.name,
      icon: path.icon ? <path.icon /> : null,
      label: <Link to={path.path}>{path.name}</Link>,
    }));

  return (
    <Layout
      style={{ minHeight: "100vh", background: "#f0f2f5", minWidth: "100vw" }}
    >
      <Sider collapsible>
        <div className="admin-logo">
          <span className="admin-logo-text">CMS</span>
        </div>
        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>
      <Layout>
        <HeaderAdminLayout />
        {/* HeaderAdminLayout is the header component */}
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
