import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Space, Popconfirm } from "antd";
import UserAdminForm from "./userAdminForm";
import { UserType } from "@src/component/authentication/useAuthStore";
import {
  addOrCreateUserEndpoint,
  deleteUserByIdEndpoint,
  getUserByIdEndpoint,
  getUsersEndpoint,
} from "./userAdminEndpoint";
import { Pen, Trash2 } from "lucide-react";

const UserAdminComponent: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUsersEndpoint();
        if (response && response?.data) {
          const usersWithKeys = response.data.map((user: UserType) => ({
            ...user,
            key: user.id, // Sử dụng id làm key
          }));
          setUsers(usersWithKeys);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleAdd = () => {
    setEditingUser(null);
    form?.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (id: number) => {
    const fetchUser = async () => {
      const response = await getUserByIdEndpoint(id);
      if (response) {
        setEditingUser(response);
        form?.setFieldsValue(response);
        setIsModalOpen(true);
      }
    };

    fetchUser();
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));

    const deleteUser = async () => {
      const response = await deleteUserByIdEndpoint(id);
      if (response) {
        setEditingUser(response);
        form?.setFieldsValue(response);
        setIsModalOpen(true);
      }
    };

    deleteUser();
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: UserType) => (
        <Space>
          <Pen
            color="blue"
            size={20}
            onClick={() => handleEdit(record.id)}
            className="cursor-pointer mr-2"
          />
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Trash2 color="red" size={20} className="cursor-pointer" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add User
      </Button>
      <Table columns={columns} dataSource={users} />

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null} // Loại bỏ footer mặc định của Modal
      >
        <UserAdminForm
          form={form}
          editingUser={editingUser}
          setUsers={setUsers}
          users={users}
          onClose={() => setIsModalOpen(false)} // Đóng modal sau khi lưu
        />
      </Modal>
    </div>
  );
};

export default UserAdminComponent;
