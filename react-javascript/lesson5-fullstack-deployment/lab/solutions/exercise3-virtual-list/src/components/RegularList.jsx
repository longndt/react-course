import PropTypes from 'prop-types';

function RegularList({
  items,
  itemHeight,
  containerHeight,
  renderItem
}) {
  const containerStyle = {
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

RegularList.propTypes = {
  items: PropTypes.array.isRequired,
  itemHeight: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default RegularList;
