import React from "react";
import { Layout, Avatar, Typography, Dropdown, Menu } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { emitLogoutEvent } from "@src/component/authentication/authEvent";
import useAuthStore from "@src/component/authentication/useAuthStore";

const { Header } = Layout;
const { Text } = Typography;

const HeaderAdminLayout: React.FC = () => {
  const { user } = useAuthStore();

  const handleLogout = () => {
    emitLogoutEvent();
    window.location.href = "/";
  };

  const menuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <Header className="admin-header">
      <div className="admin-header-user-section">
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Avatar
              src={user?.avatar || undefined}
              alt="User Avatar"
              className="admin-header-avatar"
              icon={!user?.avatar && <UserOutlined />}
            />
            <Text className="admin-header-user-name">{user?.fullName}</Text>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderAdminLayout;
