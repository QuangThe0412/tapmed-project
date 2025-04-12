import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Space, Popconfirm, message } from "antd";
import UserAdminForm from "./userAdminForm";
import { UserType } from "@src/component/authentication/useAuthStore";
import {
  deleteUserByIdEndpoint,
  getUserByIdEndpoint,
  getUsersEndpoint,
} from "./userAdminEndpoint";
import { Pen, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const UserAdminComponent: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [form] = Form.useForm();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUsersEndpoint({
          page: currentPage,
          pageSize,
        });
        if (response) {
          const { data, totalElements } = response;
          setUsers(
            data.map((user: any) => ({
              ...user,
              key: user.id, // Sử dụng id làm key
            }))
          );
          setTotalElements(totalElements); // Cập nhật tổng số người dùng
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        message.error("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, [currentPage, pageSize]); // Gọi lại khi currentPage hoặc pageSize thay đổi

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (id: number) => {
    const fetchUser = async () => {
      try {
        const response = await getUserByIdEndpoint(id);
        if (response) {
          setEditingUser(response);
          form.setFieldsValue(response);
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        message.error("Failed to fetch user details.");
      }
    };

    fetchUser();
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteUserByIdEndpoint(id);
      if (response) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        toast.success("User deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("An error occurred while deleting the user.");
    }
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current); // Cập nhật trang hiện tại
    setPageSize(pagination.pageSize); // Cập nhật số hàng trên mỗi trang
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_: any, __: any, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
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
      <Table
        columns={columns}
        dataSource={users}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalElements,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
        }}
        onChange={handleTableChange} // Xử lý sự kiện thay đổi pagination
      />
      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <UserAdminForm
          form={form}
          editingUser={editingUser}
          setUsers={setUsers}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default UserAdminComponent;
