import React, { useState, useMemo, useCallback } from 'react';
import VirtualList from '../components/VirtualList';
import './PerformanceDemo.css';

interface User {
    id: number;
    name: string;
    email: string;
    department: string;
    salary: number;
}

const PerformanceDemo: React.FC = () => {
    const [itemCount, setItemCount] = useState(1000);
    const [useVirtualList, setUseVirtualList] = useState(true);

    // Generate mock users
    const users = useMemo(() => {
        return Array.from({ length: itemCount }, (_, i) => ({
            id: i + 1,
            name: `User ${i + 1}`,
            email: `user${i + 1}@example.com`,
            department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][i % 5],
            salary: 50000 + Math.random() * 100000,
        }));
    }, [itemCount]);

    const renderUser = useCallback((user: User, index: number) => (
        <div className="user-item">
            <div className="user-avatar">
                {user.name.charAt(0)}
            </div>
            <div className="user-info">
                <h3 className="user-name">{user.name}</h3>
                <p className="user-email">{user.email}</p>
                <p className="user-department">{user.department}</p>
            </div>
            <div className="user-salary">
                ${user.salary.toLocaleString()}
            </div>
        </div>
    ), []);

    const renderRegularList = () => (
        <div className="regular-list" style={{ height: 400, overflow: 'auto' }}>
            {users.map((user, index) => (
                <div key={user.id} style={{ height: 60, borderBottom: '1px solid #eee' }}>
                    {renderUser(user, index)}
                </div>
            ))}
        </div>
    );

    const renderVirtualList = () => (
        <VirtualList
            items={users}
            itemHeight={60}
            containerHeight={400}
            renderItem={renderUser}
        />
    );

    return (
        <div className="performance-demo">
            <div className="demo-header">
                <h1>Performance Demo</h1>
                <p>Compare regular list vs virtual list performance</p>
            </div>

            <div className="demo-controls">
                <div className="control-group">
                    <label htmlFor="itemCount">Number of items:</label>
                    <select
                        id="itemCount"
                        value={itemCount}
                        onChange={(e) => setItemCount(Number(e.target.value))}
                    >
                        <option value={100}>100 items</option>
                        <option value={1000}>1,000 items</option>
                        <option value={5000}>5,000 items</option>
                        <option value={10000}>10,000 items</option>
                        <option value={50000}>50,000 items</option>
                    </select>
                </div>

                <div className="control-group">
                    <label>
                        <input
                            type="radio"
                            checked={!useVirtualList}
                            onChange={() => setUseVirtualList(false)}
                        />
                        Regular List
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={useVirtualList}
                            onChange={() => setUseVirtualList(true)}
                        />
                        Virtual List
                    </label>
                </div>
            </div>

            <div className="demo-content">
                <div className="demo-section">
                    <h2>
                        {useVirtualList ? 'Virtual List' : 'Regular List'}
                        ({itemCount.toLocaleString()} items)
                    </h2>

                    <div className="performance-info">
                        <p>
                            <strong>Rendered DOM nodes:</strong> {
                                useVirtualList
                                    ? `${Math.ceil(400 / 60) + 2} (only visible items)`
                                    : `${itemCount} (all items)`
                            }
                        </p>
                        <p>
                            <strong>Memory usage:</strong> {
                                useVirtualList
                                    ? 'Constant (regardless of total items)'
                                    : 'Increases with item count'
                            }
                        </p>
                    </div>

                    <div className="list-container">
                        {useVirtualList ? renderVirtualList() : renderRegularList()}
                    </div>
                </div>
            </div>

            <div className="demo-explanation">
                <h3>Performance Benefits of Virtual Lists:</h3>
                <ul>
                    <li>✅ <strong>Constant DOM size:</strong> Only renders visible items</li>
                    <li>✅ <strong>Better memory usage:</strong> Doesn't grow with data size</li>
                    <li>✅ <strong>Smooth scrolling:</strong> Maintains 60 FPS even with millions of items</li>
                    <li>✅ <strong>Faster initial render:</strong> No need to create thousands of DOM nodes</li>
                </ul>

                <h3>When to use Virtual Lists:</h3>
                <ul>
                    <li>📊 Large datasets (1000+ items)</li>
                    <li>📱 Mobile devices with limited memory</li>
                    <li>⚡ Performance-critical applications</li>
                    <li>🔄 Real-time data that updates frequently</li>
                </ul>
            </div>
        </div>
    );
};

export default PerformanceDemo;
