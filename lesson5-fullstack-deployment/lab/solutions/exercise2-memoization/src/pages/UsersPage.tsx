import { useState, useCallback, useMemo } from 'react';
import UserList from '../components/UserList';
import PerformanceComparison from '../components/PerformanceComparison';
import './UsersPage.css';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Generate mock users
const generateUsers = (count: number): User[] => {
  const roles = ['Admin', 'Editor', 'Viewer', 'Guest'];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
  }));
};

export default function UsersPage() {
  const [users] = useState(() => generateUsers(1000));
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [filterRole, setFilterRole] = useState<string>('all');

  // Memoized callback - prevents UserItem re-renders
  const handleSelect = useCallback((user: User) => {
    console.log('User selected:', user.name);
    setSelectedUser(user.id);
  }, []);

  // Expensive computation - memoized
  const filteredAndSortedUsers = useMemo(() => {
    // Educational log - shows when this expensive computation runs
    console.log('[DEMO] Filtering and sorting users...');

    let result = [...users];    // Filter by search term
    if (searchTerm) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by role
    if (filterRole !== 'all') {
      result = result.filter(user => user.role === filterRole);
    }

    // Sort by name
    result.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortAsc ? comparison : -comparison;
    });

    return result;
  }, [users, searchTerm, sortAsc, filterRole]);

  // Non-memoized version for comparison
  const nonMemoizedFiltered = () => {
    console.log('NON-MEMOIZED: Filtering and sorting...');
    let result = [...users];

    if (searchTerm) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRole !== 'all') {
      result = result.filter(user => user.role === filterRole);
    }

    result.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortAsc ? comparison : -comparison;
    });

    return result;
  };

  // Stats calculated with useMemo
  const stats = useMemo(() => {
    console.log('Calculating stats...');
    return {
      total: users.length,
      filtered: filteredAndSortedUsers.length,
      admins: filteredAndSortedUsers.filter(u => u.role === 'Admin').length,
      editors: filteredAndSortedUsers.filter(u => u.role === 'Editor').length,
      viewers: filteredAndSortedUsers.filter(u => u.role === 'Viewer').length,
      guests: filteredAndSortedUsers.filter(u => u.role === 'Guest').length,
    };
  }, [users, filteredAndSortedUsers]);

  return (
    <div className="users-page">
      <h1>👥 Users Management</h1>
      <p className="subtitle">
        Demonstrating React.memo, useCallback, and useMemo optimization
      </p>

      {/* Performance Counter */}
      <div className="performance-test">
        <h3>Performance Test</h3>
        <p>Count: <strong>{count}</strong></p>
        <button onClick={() => setCount(count + 1)} className="btn-test">
          Increment (Test Re-render)
        </button>
        <p className="help-text">
          Open Console (F12) and click this button. UserItems should NOT re-render thanks to React.memo + useCallback!
        </p>
      </div>

      {/* Statistics */}
      <div className="stats-section">
        <h3> Statistics (Memoized)</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.filtered}</div>
            <div className="stat-label">Filtered Results</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.admins}</div>
            <div className="stat-label">Admins</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.editors}</div>
            <div className="stat-label">Editors</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.viewers}</div>
            <div className="stat-label">Viewers</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.guests}</div>
            <div className="stat-label">Guests</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <h3> Filters</h3>
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="search">Search:</label>
            <input
              id="search"
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="role-select"
            >
              <option value="all">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
              <option value="Guest">Guest</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort:</label>
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="btn-sort"
            >
              {sortAsc ? '↑ A→Z' : '↓ Z→A'}
            </button>
          </div>
        </div>
      </div>

      {/* Selected User Info */}
      {selectedUser && (
        <div className="selected-user">
          <strong>Selected User ID:</strong> {selectedUser}
        </div>
      )}

      {/* User List */}
      <div className="user-list-section">
        <h3>User List (Memoized)</h3>
        <UserList users={filteredAndSortedUsers} onSelect={handleSelect} />
      </div>

      {/* Performance Comparison Component */}
      <PerformanceComparison />

      {/* Educational Info */}
      <div className="info-section">
        <h3> What's Happening Here?</h3>

        <div className="info-card">
          <h4>React.memo</h4>
          <p>
            <code>UserItem</code> components are wrapped in <code>React.memo</code>.
            They only re-render when their props actually change, not when the parent re-renders.
          </p>
        </div>

        <div className="info-card">
          <h4>useCallback</h4>
          <p>
            The <code>handleSelect</code> function is wrapped in <code>useCallback</code>.
            This ensures the function reference stays the same across re-renders,
            preventing unnecessary UserItem re-renders.
          </p>
          <code>
            const handleSelect = useCallback((user: User) ={'>'} {'{'}...{'}'}, []);
          </code>
        </div>

        <div className="info-card">
          <h4>useMemo</h4>
          <p>
            The filtered and sorted user list is calculated with <code>useMemo</code>.
            This expensive computation only runs when search term, role filter, or sort order changes.
          </p>
          <code>
            const filtered = useMemo(() ={'>'} {'{'}...{'}'}, [users, searchTerm, sortAsc, filterRole]);
          </code>
        </div>

        <div className="info-card highlight">
          <h4> Try This:</h4>
          <ul>
            <li>Click "Increment" button - UserItems don't re-render (check console)</li>
            <li>Type in search - Only filtering/sorting recalculates</li>
            <li>Change sort - Only runs when sort button is clicked</li>
            <li>Open Console (F12) to see optimization messages</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
