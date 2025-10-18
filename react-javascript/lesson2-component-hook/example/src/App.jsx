import { useState } from "react";
import { DataTable } from "./components/DataTable";
import { Form } from "./components/Form";
import { Modal } from "./components/Modal";
import "./App.css";

// ✅ CHECKPOINT 1: Mock data setup
const mockUsers = [
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
  // ✅ CHECKPOINT 2: useState hooks for state management
  const [users, setUsers] = useState(mockUsers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // ✅ CHECKPOINT 3: CRUD operations with functional state updates
  const handleAddUser = async (values) => {
    const newUser = {
      id: users.length + 1,
      name: values.name,
      email: values.email,
      role: values.role,
      status: "active",
    };

    setUsers((prev) => [...prev, newUser]);
    setIsAddModalOpen(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = (values) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id
            ? { ...user, name: values.name, email: values.email, role: values.role }
            : user
        )
      );
      setIsEditModalOpen(false);
      setEditingUser(null);
    }
  };

  const handleDeleteUser = (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="container">
      <h1>User Management</h1>

      {/* ✅ CHECKPOINT 4: Event handlers and state updates */}
      <button onClick={() => setIsAddModalOpen(true)} className="button">
        Add User
      </button>

      {/* ✅ CHECKPOINT 5: DataTable with custom render functions */}
      <DataTable
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
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => handleEditUser(user)}
                  className="button"
                  style={{ padding: "4px 12px", fontSize: "13px" }}
                  title="Update user"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="delete-button"
                  title="Delete user"
                >
                  Delete
                </button>
              </div>
            ),
          },
        ]}
      />

      {/* ✅ CHECKPOINT 6: Modal components with form handling */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New User"
      >
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const name = form.elements.namedItem("name").value;
            const email = form.elements.namedItem("email").value;
            const role = form.elements.namedItem("role").value;
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
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button
              type="submit"
              className="button"
              style={{
                padding: "8px 24px",
                fontSize: "14px",
                display: "inline-block",
                width: "auto"
              }}
            >
              Add
            </button>
          </div>
        </Form>
      </Modal>

      {/* ✅ CHECKPOINT 7: Edit modal with default values */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingUser(null);
        }}
        title="Update User"
      >
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const name = form.elements.namedItem("edit-name").value;
            const email = form.elements.namedItem("edit-email").value;
            const role = form.elements.namedItem("edit-role").value;
            handleUpdateUser({ name, email, role });
          }}
        >
          <div className="form-group">
            <label htmlFor="edit-name">Name</label>
            <input
              name="edit-name"
              id="edit-name"
              required
              className="text-input"
              defaultValue={editingUser?.name || ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-email">Email</label>
            <input
              name="edit-email"
              id="edit-email"
              type="email"
              required
              className="text-input"
              defaultValue={editingUser?.email || ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-role">Role</label>
            <select
              name="edit-role"
              id="edit-role"
              required
              className="select-input"
              defaultValue={editingUser?.role || "User"}
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button
              type="submit"
              className="button"
              style={{
                padding: "8px 24px",
                fontSize: "14px",
                display: "inline-block",
                width: "auto"
              }}
            >
              Update
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
