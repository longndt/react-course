import { memo } from 'react';
import PropTypes from 'prop-types';
import './UserList.css';

// Memoized UserItem - only re-renders if props change
const UserItem = memo(function UserItem({ user, onSelect }) {
  console.log(`  ↳ Rendering UserItem: ${user.id} (${user.name})`);

  return (
    <div className="user-item" onClick={() => onSelect(user)}>
      <div className="user-avatar">{user.name.charAt(0)}</div>
      <div className="user-info">
        <h3>{user.name}</h3>
        <p className="user-email">{user.email}</p>
        <span className={`user-role role-${user.role.toLowerCase()}`}>
          {user.role}
        </span>
      </div>
    </div>
  );
});

// Memoized UserList - prevents re-render if users array reference is the same
function UserList({ users, onSelect }) {
  console.log('Rendering UserList (parent component)');

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>No users found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      <div className="user-count">
        Showing {users.length} user{users.length !== 1 ? 's' : ''}
      </div>
      <div className="user-grid">
        {users.map(user => (
          <UserItem key={user.id} user={user} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

UserItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default memo(UserList);
