import React from "react";
import { Button, Form, FormInstance, Input, message } from "antd";
import { z } from "zod";
import { UserType } from "@src/component/authentication/useAuthStore";
import { addOrCreateUserEndpoint } from "./userAdminEndpoint";

interface UserAdminFormProps {
  form: FormInstance;
  editingUser: UserType | null;
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
  users: UserType[];
  onClose: () => void;
}

// Định nghĩa schema bằng zod
const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  password: z.string().optional(),
  address: z.string().optional(),
});

const UserAdminForm: React.FC<UserAdminFormProps> = ({
  form,
  editingUser,
  setUsers,
  users,
  onClose,
}) => {
  const handleSave = async () => {
    try {
      // Validate dữ liệu từ form
      const values = await form.validateFields();
      // Validate bằng zod
      userSchema.parse(values);

      const response = await addOrCreateUserEndpoint(values);
      if (response) {
        // Cập nhật danh sách người dùng sau khi thêm hoặc sửa
        if (editingUser) {
          setUsers(
            users.map((user) =>
              user.id === editingUser.id ? { ...editingUser, ...values } : user
            )
          );
        } else {
          setUsers([...users, response]);
        }
      }

      onClose(); // Đóng modal sau khi lưu
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Hiển thị lỗi từ zod
        error.errors.forEach((err) => {
          message.error(err.message);
        });
      } else {
        message.error("An error occurred while saving the user.");
        console.error(error);
      }
    }
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: "Please enter the username" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        // rules={[{ required: true, message: "Please enter the password" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone"
        rules={[{ required: true, message: "Please enter the phone number" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="fullName"
        label="Full Name"
        rules={[{ required: true, message: "Please enter the full name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please enter the email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        // rules={[{ required: true, message: "Please enter the address" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserAdminForm;
