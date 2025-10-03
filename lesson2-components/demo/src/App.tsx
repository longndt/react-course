import { useState } from "react";
import { DataTable } from "./components/DataTable";
import { Form } from "./components/Form";
import { Modal } from "./components/Modal";
import { ConfirmDialog } from "./components/ConfirmDialog";
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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

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

  const handleDeleteUser = (userId: number) => {
    setUserToDelete(userId);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete !== null) {
      setUsers((prev) => prev.filter((user) => user.id !== userToDelete));
      setUserToDelete(null);
    }
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
          {
            key: "actions",
            header: "Actions",
            sortable: false,
            render: (_, user) => (
              <button
                onClick={() => handleDeleteUser(user!.id)}
                className="delete-button"
                title="Delete user"
              >
                Delete
              </button>
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
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const name = (form.elements.namedItem("name") as HTMLInputElement)
              .value;
            const email = (form.elements.namedItem("email") as HTMLInputElement)
              .value;
            const role = (form.elements.namedItem("role") as HTMLInputElement)
              .value;
            handleAddUser({ name, email, role });
          }}
        >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input name="name" id="name" required className="text-input" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              required
              className="text-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              name="role"
              id="role"
              required
              className="select-input"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <button type="submit" className="button">
            Add User
          </button>
        </Form>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
