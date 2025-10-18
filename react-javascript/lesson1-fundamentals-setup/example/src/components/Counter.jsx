import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <div className="buttons">
        <button onClick={decrement} className="btn btn-secondary">
          -
        </button>
        <button onClick={reset} className="btn btn-danger">
          Reset
        </button>
        <button onClick={increment} className="btn btn-primary">
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;
