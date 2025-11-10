import { useMemo } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useCart } from '../context/CartContext';
import './AdminDashboard.css';

export function AdminDashboard() {
  const { users, deleteUser } = useAuth();
  const { allOrders, removeOrder } = useCart();

  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => a.role.localeCompare(b.role) || a.name.localeCompare(b.name)),
    [users]
  );

  const handleDeleteUser = (userId: string, name: string, role: 'user' | 'admin') => {
    if (role === 'admin') {
      return;
    }

    const confirmed = window.confirm(`Remove ${name} from the platform?`);
    if (confirmed) {
      deleteUser(userId);
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    const confirmed = window.confirm('Delete this order? This action cannot be undone.');
    if (confirmed) {
      removeOrder(orderId);
    }
  };

  return (
    <div className="admin-dashboard">
      <section className="admin-section">
        <div className="admin-section-header">
          <h2>User Management</h2>
          <p>Total users: {users.length}</p>
        </div>

        {sortedUsers.length === 0 ? (
          <div className="admin-empty-state">
            <p>No registered customers yet.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge">{user.role}</span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button
                        type="button"
                        className="admin-action-button"
                        onClick={() => handleDeleteUser(user.id, user.name, user.role)}
                        disabled={user.role === 'admin'}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="admin-section">
        <div className="admin-section-header">
          <h2>Orders Overview</h2>
          <p>Total orders: {allOrders.length}</p>
        </div>

        {allOrders.length === 0 ? (
          <div className="admin-empty-state">
            <p>No orders have been placed yet.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div>
                      <strong>#{order.id}</strong>
                      <div>{new Date(order.date).toLocaleString()}</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div>{order.userName}</div>
                      <div>{order.userEmail}</div>
                    </div>
                  </td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    <span className="badge">{order.status}</span>
                  </td>
                  <td>
                    <ul className="order-items-list">
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button
                        type="button"
                        className="admin-action-button secondary"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        Delete order
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

