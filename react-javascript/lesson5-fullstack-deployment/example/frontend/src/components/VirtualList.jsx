import React, { useState, useEffect, useRef, useMemo } from 'react';
import './VirtualList.css';

const VirtualList = ({
    items,
    itemHeight = 50,
    containerHeight = 400,
    renderItem,
    className = ''
}) => {
    const [scrollTop, setScrollTop] = useState(0);
    const containerRef = useRef(null);

    // Calculate visible range
    const visibleRange = useMemo(() => {
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.min(
            startIndex + Math.ceil(containerHeight / itemHeight) + 1,
            items.length - 1
        );

        return { startIndex, endIndex };
    }, [scrollTop, itemHeight, containerHeight, items.length]);

    // Get visible items
    const visibleItems = useMemo(() => {
        const { startIndex, endIndex } = visibleRange;
        return items.slice(startIndex, endIndex + 1).map((item, index) => ({
            ...item,
            index: startIndex + index
        }));
    }, [items, visibleRange]);

    // Calculate total height
    const totalHeight = items.length * itemHeight;

    // Calculate offset for visible items
    const offsetY = visibleRange.startIndex * itemHeight;

    const handleScroll = (e) => {
        setScrollTop(e.target.scrollTop);
    };

    return (
        <div
            ref={containerRef}
            className={`virtual-list ${className}`}
            style={{ height: containerHeight, overflow: 'auto' }}
            onScroll={handleScroll}
        >
            <div style={{ height: totalHeight, position: 'relative' }}>
                <div
                    style={{
                        transform: `translateY(${offsetY}px)`,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0
                    }}
                >
                    {visibleItems.map((item) => (
                        <div
                            key={item.id || item.index}
                            style={{ height: itemHeight }}
                            className="virtual-list-item"
                        >
                            {renderItem ? renderItem(item, item.index) : item.content}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VirtualList;
