import { useState } from "react";
import { DataTable } from "./components/DataTable";
import { Form } from "./components/Form";
import { Modal } from "./components/Modal";
import "./App.css";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "User",
    status: "inactive",
  },
];

export function App() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  interface NewUserForm {
    name: string;
    email: string;
    role: string;
  }

  const handleAddUser = async (values: NewUserForm) => {
    const newUser: User = {
      id: users.length + 1,
      name: values.name,
      email: values.email,
      role: values.role,
      status: "active",
    };

    setUsers((prev) => [...prev, newUser]);
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h1>User Management</h1>

      <button onClick={() => setIsModalOpen(true)} className="button">
        Add User
      </button>

      <DataTable<User>
        data={users}
        columns={[
          { key: "name", header: "Name" },
          { key: "email", header: "Email" },
          { key: "role", header: "Role" },
          {
            key: "status",
            header: "Status",
            render: (value) => (
              <span className={`status ${value}`}>{value}</span>
            ),
          },
        ]}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New User"
      >
        <Form
          fields={[
            {
              name: "name",
              label: "Name",
              required: true,
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              required: true,
              validate: (value: string) => {
                if (!value.includes("@")) {
                  return "Please enter a valid email address";
                }
                return undefined;
              },
            },
            {
              name: "role",
              label: "Role",
              required: true,
            },
          ]}
          initialValues={{
            name: "",
            email: "",
            role: "User",
          }}
          onSubmit={handleAddUser}
          submitText="Add User"
        />
      </Modal>
    </div>
  );
}
