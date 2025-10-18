import { useState, useCallback, useMemo } from 'react';

// Strict TypeScript interfaces with exact optional properties
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
    // Optional properties must be explicitly undefined or the value
    avatar?: string | undefined;
    preferences?: {
        theme: 'light' | 'dark';
        notifications: boolean;
    } | undefined;
}

// Strict function types with proper parameter typing
type UserUpdateHandler = (user: User) => void;
type UserFilter = (user: User) => boolean;

// Generic interface with constraints
interface Repository<T extends { id: number }> {
    items: T[];
    add: (item: Omit<T, 'id'>) => T;
    update: (id: number, updates: Partial<T>) => T | undefined;
    remove: (id: number) => boolean;
    find: (id: number) => T | undefined;
}

// Strict component props with exact optional properties
interface StrictModeExampleProps {
    initialUsers: User[];
    onUserUpdate: UserUpdateHandler;
    filter?: UserFilter | undefined;
    className?: string | undefined;
}

function StrictModeExample({
    initialUsers,
    onUserUpdate,
    filter,
    className
}: StrictModeExampleProps) {
    // Strict state typing with proper initialization
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState<keyof User>('name');

    // Strict callback with proper dependency array
    const handleUserUpdate = useCallback((updatedUser: User) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === updatedUser.id ? updatedUser : user
            )
        );
        onUserUpdate(updatedUser);
    }, [onUserUpdate]);

    // Strict memoization with proper dependencies
    const filteredAndSortedUsers = useMemo(() => {
        let filtered = users;

        // Apply custom filter if provided
        if (filter) {
            filtered = filtered.filter(filter);
        }

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort users
        return [...filtered].sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return aValue.localeCompare(bValue);
            }

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return aValue - bValue;
            }

            if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
                return aValue === bValue ? 0 : aValue ? 1 : -1;
            }

            return 0;
        });
    }, [users, filter, searchTerm, sortBy]);

    // Strict event handlers with proper typing
    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, []);

    const handleSortChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value as keyof User);
    }, []);

    const handleUserToggle = useCallback((userId: number) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId
                    ? { ...user, isActive: !user.isActive }
                    : user
            )
        );
    }, []);

    // Strict null checks and proper error handling
    const handleUserClick = useCallback((user: User) => {
        try {
            // This will be caught by strict null checks if user is undefined
            console.log(`Clicked user: ${user.name} (${user.email})`);
        } catch (error) {
            console.error('Error handling user click:', error);
        }
    }, []);

    return (
        <div className={className || 'strict-mode-example'}>
            <h2>Strict Mode Example</h2>

            {/* Search and sort controls */}
            <div className="controls">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    aria-label="Search users"
                />

                <select
                    value={sortBy}
                    onChange={handleSortChange}
                    aria-label="Sort users by"
                >
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="age">Age</option>
                    <option value="isActive">Active Status</option>
                </select>
            </div>

            {/* User list with strict typing */}
            <div className="user-list">
                {filteredAndSortedUsers.length === 0 ? (
                    <p>No users found</p>
                ) : (
                    filteredAndSortedUsers.map((user) => (
                        <div
                            key={user.id}
                            className={`user-item ${user.isActive ? 'active' : 'inactive'}`}
                            onClick={() => handleUserClick(user)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleUserClick(user);
                                }
                            }}
                        >
                            <div className="user-info">
                                <h3>{user.name}</h3>
                                <p>{user.email}</p>
                                <p>Age: {user.age}</p>
                                {user.avatar && (
                                    <img
                                        src={user.avatar}
                                        alt={`${user.name}'s avatar`}
                                        className="avatar"
                                    />
                                )}
                            </div>

                            <div className="user-actions">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUserToggle(user.id);
                                    }}
                                    aria-label={`${user.isActive ? 'Deactivate' : 'Activate'} ${user.name}`}
                                >
                                    {user.isActive ? 'Deactivate' : 'Activate'}
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUserUpdate(user);
                                    }}
                                    aria-label={`Update ${user.name}`}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Statistics with strict typing */}
            <div className="stats">
                <p>Total users: {users.length}</p>
                <p>Active users: {users.filter(user => user.isActive).length}</p>
                <p>Filtered results: {filteredAndSortedUsers.length}</p>
            </div>
        </div>
    );
}

export default StrictModeExample;

// Example usage with strict typing
export function StrictModeExampleUsage() {
    const initialUsers: User[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            age: 30,
            isActive: true,
            avatar: 'https://via.placeholder.com/50',
            preferences: {
                theme: 'light',
                notifications: true
            }
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            age: 25,
            isActive: false,
            // avatar is undefined (explicitly)
            avatar: undefined,
            preferences: undefined
        }
    ];

    const handleUserUpdate: UserUpdateHandler = (user) => {
        console.log('User updated:', user);
    };

    const activeUserFilter: UserFilter = (user) => user.isActive;

    return (
        <StrictModeExample
            initialUsers={initialUsers}
            onUserUpdate={handleUserUpdate}
            filter={activeUserFilter}
            className="my-strict-example"
        />
    );
}
