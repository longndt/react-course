import React, { useState, useMemo, useCallback } from 'react';
import VirtualList from '../components/VirtualList';
import './PerformanceDemo.css';

const PerformanceDemo = () => {
    const [itemCount, setItemCount] = useState(10000);
    const [showVirtual, setShowVirtual] = useState(true);

    // Generate large dataset
    const items = useMemo(() => {
        return Array.from({ length: itemCount }, (_, index) => ({
            id: index,
            content: `Item ${index + 1}`,
            description: `This is item number ${index + 1} with some additional content to make it more realistic.`,
            value: Math.floor(Math.random() * 1000),
            category: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]
        }));
    }, [itemCount]);

    // Regular list component (for comparison)
    const RegularList = () => (
        <div className="regular-list">
            {items.map((item) => (
                <div key={item.id} className="list-item">
                    <div className="item-content">
                        <h4>{item.content}</h4>
                        <p>{item.description}</p>
                        <div className="item-meta">
                            <span className="value">Value: {item.value}</span>
                            <span className="category">Category: {item.category}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    // Virtual list item renderer
    const renderItem = useCallback((item) => (
        <div className="list-item">
            <div className="item-content">
                <h4>{item.content}</h4>
                <p>{item.description}</p>
                <div className="item-meta">
                    <span className="value">Value: {item.value}</span>
                    <span className="category">Category: {item.category}</span>
                </div>
            </div>
        </div>
    ), []);

    const handleItemCountChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 100 && value <= 100000) {
            setItemCount(value);
        }
    };

    return (
        <div className="performance-demo">
            <div className="demo-header">
                <h1>Performance Optimization Demo</h1>
                <p>Compare regular rendering vs virtual scrolling for large lists</p>
            </div>

            <div className="demo-controls">
                <div className="control-group">
                    <label htmlFor="itemCount">Number of items:</label>
                    <input
                        id="itemCount"
                        type="number"
                        min="100"
                        max="100000"
                        step="100"
                        value={itemCount}
                        onChange={handleItemCountChange}
                        className="item-count-input"
                    />
                </div>

                <div className="control-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={showVirtual}
                            onChange={(e) => setShowVirtual(e.target.checked)}
                        />
                        Use Virtual Scrolling
                    </label>
                </div>
            </div>

            <div className="demo-content">
                <div className="list-container">
                    <h3>
                        {showVirtual ? 'Virtual List' : 'Regular List'}
                        ({itemCount.toLocaleString()} items)
                    </h3>

                    {showVirtual ? (
                        <VirtualList
                            items={items}
                            itemHeight={80}
                            containerHeight={400}
                            renderItem={renderItem}
                            className="demo-virtual-list"
                        />
                    ) : (
                        <div className="demo-regular-list">
                            <RegularList />
                        </div>
                    )}
                </div>

                <div className="performance-info">
                    <h3>Performance Benefits</h3>
                    <div className="info-grid">
                        <div className="info-card">
                            <h4>Memory Usage</h4>
                            <p>
                                {showVirtual
                                    ? 'Only renders ~10-15 visible items regardless of total count'
                                    : `Renders all ${itemCount.toLocaleString()} items in DOM`
                                }
                            </p>
                        </div>

                        <div className="info-card">
                            <h4>Rendering Time</h4>
                            <p>
                                {showVirtual
                                    ? 'Constant time O(1) - instant rendering'
                                    : `Linear time O(n) - ${itemCount > 1000 ? 'slow' : 'fast'} rendering`
                                }
                            </p>
                        </div>

                        <div className="info-card">
                            <h4>Scroll Performance</h4>
                            <p>
                                {showVirtual
                                    ? 'Smooth scrolling with minimal re-renders'
                                    : `${itemCount > 1000 ? 'May cause janky scrolling' : 'Smooth scrolling'}`
                                }
                            </p>
                        </div>

                        <div className="info-card">
                            <h4>DOM Nodes</h4>
                            <p>
                                {showVirtual
                                    ? '~10-15 DOM nodes'
                                    : `${itemCount.toLocaleString()} DOM nodes`
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="demo-tips">
                <h3>💡 Tips for Performance</h3>
                <ul>
                    <li>Use virtual scrolling for lists with 1000+ items</li>
                    <li>Implement React.memo() for expensive components</li>
                    <li>Use useMemo() and useCallback() for expensive calculations</li>
                    <li>Consider code splitting for large applications</li>
                    <li>Optimize images and use lazy loading</li>
                </ul>
            </div>
        </div>
    );
};

export default PerformanceDemo;
