import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

function VirtualList({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  buffer = 3,
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

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

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const containerStyle = {
    height: containerHeight,
    overflow: 'auto',
    position: 'relative',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
  };

  const spacerStyle = {
    height: totalHeight,
    width: '100%',
  };

  const contentStyle = {
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

VirtualList.propTypes = {
  items: PropTypes.array.isRequired,
  itemHeight: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
  renderItem: PropTypes.func.isRequired,
  buffer: PropTypes.number,
};

export default VirtualList;
