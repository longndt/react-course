/**
 * User.js - Default Export
 * Main class exported as default
 */

// Default export - only one per file
export default class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }

  getInfo() {
    return {
      name: this.name,
      email: this.email,
      createdAt: this.createdAt
    };
  }

  static createGuest() {
    return new User('Guest', 'guest@example.com');
  }
}
