import { useState, memo } from 'react';
import './PerformanceComparison.css';

// Non-memoized component - re-renders every time
function ExpensiveComponentNoMemo({ count }: { count: number }) {
  console.log(' ExpensiveComponentNoMemo rendering...');

  // Simulate expensive calculation
  const expensiveValue = Array.from({ length: 1000 }).reduce((acc, _, i) => acc + i, 0);

  return (
    <div className="component-card no-memo">
      <h4> Without React.memo</h4>
      <p>Renders: Every time parent renders</p>
      <p>Count prop: {count}</p>
      <p>Expensive value: {expensiveValue}</p>
      <small>Check console - renders on every parent update!</small>
    </div>
  );
}

// Memoized component - only re-renders if props change
const ExpensiveComponentWithMemo = memo(function ExpensiveComponentWithMemo({ count }: { count: number }) {
  console.log(' ExpensiveComponentWithMemo rendering...');

  // Simulate expensive calculation
  const expensiveValue = Array.from({ length: 1000 }).reduce((acc, _, i) => acc + i, 0);

  return (
    <div className="component-card with-memo">
      <h4> With React.memo</h4>
      <p>Renders: Only when props change</p>
      <p>Count prop: {count}</p>
      <p>Expensive value: {expensiveValue}</p>
      <small>Check console - only renders when count changes!</small>
    </div>
  );
});

export default function PerformanceComparison() {
  const [parentCount, setParentCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  return (
    <div className="performance-comparison">
      <h3> React.memo Performance Comparison</h3>

      <div className="controls">
        <div className="control-group">
          <label>Parent State (forces parent re-render):</label>
          <button onClick={() => setParentCount(parentCount + 1)} className="btn-parent">
            Increment Parent ({parentCount})
          </button>
        </div>

        <div className="control-group">
          <label>Child State (passed as prop):</label>
          <button onClick={() => setChildCount(childCount + 1)} className="btn-child">
            Increment Child ({childCount})
          </button>
        </div>
      </div>

      <div className="comparison-grid">
        <ExpensiveComponentNoMemo count={childCount} />
        <ExpensiveComponentWithMemo count={childCount} />
      </div>

      <div className="explanation">
        <h4> Experiment:</h4>
        <ol>
          <li>
            <strong>Click "Increment Parent"</strong>
            <ul>
              <li> Left component re-renders (no memo)</li>
              <li> Right component does NOT re-render (memoized, props unchanged)</li>
            </ul>
          </li>
          <li>
            <strong>Click "Increment Child"</strong>
            <ul>
              <li> Left component re-renders (no memo)</li>
              <li> Right component re-renders (memoized, but props changed)</li>
            </ul>
          </li>
        </ol>
        <p className="note">
          <strong> Key Insight:</strong> React.memo prevents unnecessary re-renders when props haven't changed,
          but still updates when props do change. This is perfect for expensive components in large lists!
        </p>
      </div>
    </div>
  );
}
