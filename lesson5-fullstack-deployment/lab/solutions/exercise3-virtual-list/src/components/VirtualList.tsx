import { useState, useRef, UIEvent, CSSProperties } from 'react';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  buffer?: number; // Number of extra items to render above/below viewport
}

function VirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  buffer = 3,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate visible range with buffer
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
  const endIndex = Math.min(
    items.length,
    startIndex + Math.ceil(containerHeight / itemHeight) + buffer * 2
  );

  // Get visible items
  const visibleItems = items.slice(startIndex, endIndex);

  // Total height of all items (creates scrollbar)
  const totalHeight = items.length * itemHeight;

  // Offset to position visible items correctly
  const offsetY = startIndex * itemHeight;

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const containerStyle: CSSProperties = {
    height: containerHeight,
    overflow: 'auto',
    position: 'relative',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
  };

  const spacerStyle: CSSProperties = {
    height: totalHeight,
    width: '100%',
  };

  const contentStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    transform: `translateY(${offsetY}px)`,
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={containerStyle}
    >
      {/* Invisible spacer to create scrollbar for full list */}
      <div style={spacerStyle} />

      {/* Only render visible items */}
      <div style={contentStyle}>
        {visibleItems.map((item, index) => {
          const actualIndex = startIndex + index;
          return (
            <div key={actualIndex} style={{ height: itemHeight }}>
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VirtualList;
