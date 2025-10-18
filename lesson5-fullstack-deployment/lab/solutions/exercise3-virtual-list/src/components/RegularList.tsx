import { CSSProperties } from 'react';

interface RegularListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

function RegularList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem
}: RegularListProps<T>) {
  const containerStyle: CSSProperties = {
    height: containerHeight,
    overflow: 'auto',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
  };

  return (
    <div style={containerStyle}>
      {items.map((item, index) => (
        <div key={index} style={{ height: itemHeight }}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

export default RegularList;
