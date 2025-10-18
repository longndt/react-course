// ============================================
// Bonus Challenge: UserManager Class Solution
// ============================================

class UserManager {
  constructor() {
    this.users = [];
  }

  // Add user (use spread to copy)
  addUser(user) {
    this.users = [...this.users, { ...user }];
  }

  // Get user by id (use find)
  getUser(id) {
    return this.users.find(u => u.id === id);
  }

  // Update user (use spread, destructuring)
  updateUser(id, updates) {
    this.users = this.users.map(u =>
      u.id === id ? { ...u, ...updates } : u
    );
  }

  // Get active users (use filter)
  getActiveUsers() {
    return this.users.filter(u => u.active);
  }

  // Get user summary (use map, template literal)
  getUserSummaries() {
    return this.users.map(u =>
      `${u.name} (${u.active ? 'Active' : 'Inactive'})`
    );
  }

  // Additional methods demonstrating more ES6+ features
  // Delete user (use filter)
  deleteUser(id) {
    this.users = this.users.filter(u => u.id !== id);
  }

  // Get users by role (use filter with destructuring)
  getUsersByRole(role) {
    return this.users.filter(({ role: userRole }) => userRole === role);
  }

  // Get user statistics (use reduce, destructuring)
  getUserStats() {
    const stats = this.users.reduce((acc, { active, age }) => {
      acc.total++;
      if (active) acc.active++;
      if (age) {
        acc.totalAge += age;
        acc.hasAge = true;
      }
      return acc;
    }, { total: 0, active: 0, totalAge: 0, hasAge: false });

    return {
      ...stats,
      inactive: stats.total - stats.active,
      averageAge: stats.hasAge ? Math.round(stats.totalAge / stats.total) : null
    };
  }

  // Search users (use filter, includes, optional chaining)
  searchUsers(query) {
    const searchTerm = query?.toLowerCase() ?? '';
    return this.users.filter(({ name, email }) =>
      name?.toLowerCase().includes(searchTerm) ||
      email?.toLowerCase().includes(searchTerm)
    );
  }

  // Bulk operations (use spread, map)
  addMultipleUsers(users) {
    this.users = [...this.users, ...users.map(user => ({ ...user }))];
  }

  // Get users with pagination (use slice, destructuring)
  getUsersPaginated(page = 1, limit = 10) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = this.users.slice(startIndex, endIndex);
    
    return {
      users: paginatedUsers,
      pagination: {
        page,
        limit,
        total: this.users.length,
        totalPages: Math.ceil(this.users.length / limit),
        hasNext: endIndex < this.users.length,
        hasPrev: page > 1
      }
    };
  }

  // Export users (use map, destructuring)
  exportUsers() {
    return this.users.map(({ id, name, email, active, role, age }) => ({
      id,
      name,
      email,
      status: active ? 'Active' : 'Inactive',
      role: role ?? 'User',
      age: age ?? 'Not specified'
    }));
  }

  // Clear all users
  clearUsers() {
    this.users = [];
  }

  // Get user count
  getUserCount() {
    return this.users.length;
  }

  // Check if user exists
  hasUser(id) {
    return this.users.some(u => u.id === id);
  }
}

module.exports = UserManager;
