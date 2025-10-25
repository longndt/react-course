import React, { useState, useRef, useMemo } from 'react';
import './VirtualList.css';

interface VirtualListProps<T> {
    items: T[];
    itemHeight: number;
    containerHeight: number;
    renderItem: (item: T, index: number) => React.ReactNode;
    className?: string;
}

function VirtualList<T>({
    items,
    itemHeight,
    containerHeight,
    renderItem,
    className = ''
}: VirtualListProps<T>) {
    const [scrollTop, setScrollTop] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate visible range
    const visibleRange = useMemo(() => {
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.min(
            startIndex + Math.ceil(containerHeight / itemHeight) + 1,
            items.length
        );
        return { startIndex, endIndex };
    }, [scrollTop, itemHeight, containerHeight, items.length]);

    // Get visible items
    const visibleItems = useMemo(() => {
        return items.slice(visibleRange.startIndex, visibleRange.endIndex);
    }, [items, visibleRange.startIndex, visibleRange.endIndex]);

    // Total height of all items
    const totalHeight = items.length * itemHeight;

    // Offset to position visible items correctly
    const offsetY = visibleRange.startIndex * itemHeight;

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    };

    return (
        <div
            ref={containerRef}
            className={`virtual-list ${className}`}
            onScroll={handleScroll}
            style={{
                height: containerHeight,
                overflow: 'auto',
                position: 'relative',
            }}
        >
            {/* Spacer to create scrollbar */}
            <div style={{ height: totalHeight, width: '100%' }} />

            {/* Visible items */}
            <div
                className="virtual-list-items"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    transform: `translateY(${offsetY}px)`,
                }}
            >
                {visibleItems.map((item, index) => (
                    <div
                        key={visibleRange.startIndex + index}
                        className="virtual-list-item"
                        style={{ height: itemHeight }}
                    >
                        {renderItem(item, visibleRange.startIndex + index)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VirtualList;
