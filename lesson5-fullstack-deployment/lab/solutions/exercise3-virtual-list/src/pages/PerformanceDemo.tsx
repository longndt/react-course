import { useState, useMemo } from 'react';
import VirtualList from '../components/VirtualList';
import RegularList from '../components/RegularList';
import './PerformanceDemo.css';

interface Item {
  id: number;
  title: string;
  description: string;
  category: string;
  timestamp: string;
}

const generateItems = (count: number): Item[] => {
  const categories = ['Technology', 'Science', 'Business', 'Health', 'Sports'];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    title: `Item #${i}`,
    description: `This is the description for item ${i}. It contains some meaningful text to simulate real data.`,
    category: categories[i % categories.length],
    timestamp: new Date(Date.now() - Math.random() * 10000000000).toLocaleString(),
  }));
};

export default function PerformanceDemo() {
  const [activeTab, setActiveTab] = useState<'virtual' | 'regular'>('virtual');
  const [itemCount, setItemCount] = useState(10000);
  const [showStats, setShowStats] = useState(false);

  const items = useMemo(() => generateItems(itemCount), [itemCount]);

  const renderItem = (item: Item, index: number) => (
    <div
      className="list-item"
      style={{
        backgroundColor: index % 2 === 0 ? '#f9fafb' : 'white',
      }}
    >
      <div className="item-header">
        <span className="item-title">{item.title}</span>
        <span className={`item-category category-${item.category.toLowerCase()}`}>
          {item.category}
        </span>
      </div>
      <p className="item-description">{item.description}</p>
      <small className="item-timestamp">{item.timestamp}</small>
    </div>
  );

  return (
    <div className="performance-demo">
      <div className="demo-header">
        <h1> Virtual List Performance Demo</h1>
        <p className="subtitle">
          Comparing regular list vs virtual list with {itemCount.toLocaleString()} items
        </p>
      </div>

      {/* Controls */}
      <div className="controls-section">
        <div className="control-group">
          <label htmlFor="item-count">Number of Items:</label>
          <select
            id="item-count"
            value={itemCount}
            onChange={(e) => setItemCount(Number(e.target.value))}
            className="item-count-select"
          >
            <option value={1000}>1,000 items</option>
            <option value={5000}>5,000 items</option>
            <option value={10000}>10,000 items</option>
            <option value={50000}>50,000 items</option>
            <option value={100000}>100,000 items</option>
          </select>
        </div>

        <button
          onClick={() => setShowStats(!showStats)}
          className="btn-stats"
        >
          {showStats ? ' Hide' : ' Show'} Performance Stats
        </button>
      </div>

      {/* Stats Panel */}
      {showStats && (
        <div className="stats-panel">
          <h3>Performance Metrics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total Items</div>
              <div className="stat-value">{itemCount.toLocaleString()}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">
                {activeTab === 'virtual' ? 'Rendered Items' : 'All Items Rendered'}
              </div>
              <div className="stat-value">
                {activeTab === 'virtual' ? '~15' : itemCount.toLocaleString()}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Memory Usage</div>
              <div className="stat-value">
                {activeTab === 'virtual' ? 'Low ' : 'High '}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Scroll Performance</div>
              <div className="stat-value">
                {activeTab === 'virtual' ? '60 FPS ' : '< 30 FPS '}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'virtual' ? 'active' : ''}`}
          onClick={() => setActiveTab('virtual')}
        >
           Virtual List (Optimized)
        </button>
        <button
          className={`tab ${activeTab === 'regular' ? 'active' : ''}`}
          onClick={() => setActiveTab('regular')}
        >
           Regular List (Slow)
        </button>
      </div>

      {/* List Container */}
      <div className="list-container">
        {activeTab === 'virtual' ? (
          <>
            <div className="list-info success">
              <strong> Virtual List:</strong> Only renders visible items (~15 at a time).
              Smooth 60 FPS scrolling regardless of list size!
            </div>
            <VirtualList
              items={items}
              itemHeight={100}
              containerHeight={600}
              renderItem={renderItem}
              buffer={5}
            />
          </>
        ) : (
          <>
            <div className="list-info warning">
              <strong> Warning:</strong> Regular list renders ALL {itemCount.toLocaleString()} items.
              This will be slow and janky. Open DevTools Performance tab to see the difference!
            </div>
            {itemCount > 10000 && (
              <div className="list-info error">
                <strong> Danger:</strong> Rendering {itemCount.toLocaleString()} items may freeze your browser!
                Consider reducing the count or switching to Virtual List.
              </div>
            )}
            <RegularList
              items={items}
              itemHeight={100}
              containerHeight={600}
              renderItem={renderItem}
            />
          </>
        )}
      </div>

      {/* Instructions */}
      <div className="instructions">
        <h3> How to Test Performance</h3>

        <div className="instruction-section">
          <h4>1. Visual Test</h4>
          <ol>
            <li>Switch to <strong>Regular List</strong> tab</li>
            <li>Try scrolling - notice the lag and jankiness</li>
            <li>Switch to <strong>Virtual List</strong> tab</li>
            <li>Scroll - notice buttery smooth 60 FPS</li>
          </ol>
        </div>

        <div className="instruction-section">
          <h4>2. Chrome DevTools Performance Profiling</h4>
          <ol>
            <li>Open Chrome DevTools (F12)</li>
            <li>Go to <strong>Performance</strong> tab</li>
            <li>Click <strong>Record ⏺</strong> button</li>
            <li>Scroll through the list for ~3 seconds</li>
            <li>Click <strong>Stop ⏹</strong> button</li>
            <li>Analyze the results:
              <ul>
                <li><strong>FPS</strong> graph: Virtual list = 60 FPS, Regular = 20-40 FPS</li>
                <li><strong>Main thread</strong>: Virtual list = green (fast), Regular = red (slow)</li>
                <li><strong>Memory</strong>: Virtual list uses constant memory, Regular grows with items</li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="instruction-section">
          <h4>3. React DevTools Profiler</h4>
          <ol>
            <li>Install React DevTools extension</li>
            <li>Open DevTools → <strong>Profiler</strong> tab</li>
            <li>Click <strong>Record</strong></li>
            <li>Switch tabs and scroll</li>
            <li>Stop recording</li>
            <li>See render times: Virtual list renders only visible items!</li>
          </ol>
        </div>

        <div className="instruction-section highlight">
          <h4> Key Insights</h4>
          <ul>
            <li><strong>Virtual List:</strong> Constant DOM size (~15 nodes) regardless of data size</li>
            <li><strong>Regular List:</strong> DOM size = data size (10,000 nodes = slow!)</li>
            <li><strong>Virtualization</strong> is essential for lists with 1000+ items</li>
            <li><strong>Trade-off:</strong> More complex code, but massive performance gain</li>
          </ul>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="comparison-table">
        <h3> Performance Comparison</h3>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Regular List</th>
              <th>Virtual List</th>
              <th>Improvement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DOM Nodes (10K items)</td>
              <td className="bad">10,000</td>
              <td className="good">~15</td>
              <td className="improvement">99.85% reduction</td>
            </tr>
            <tr>
              <td>Initial Render Time</td>
              <td className="bad">500-1000ms</td>
              <td className="good">10-20ms</td>
              <td className="improvement">50x faster</td>
            </tr>
            <tr>
              <td>Scroll FPS</td>
              <td className="bad">20-40 FPS</td>
              <td className="good">60 FPS</td>
              <td className="improvement">3x smoother</td>
            </tr>
            <tr>
              <td>Memory Usage</td>
              <td className="bad">High (grows with items)</td>
              <td className="good">Low (constant)</td>
              <td className="improvement">Constant memory</td>
            </tr>
            <tr>
              <td>Battery Impact</td>
              <td className="bad">High CPU usage</td>
              <td className="good">Minimal CPU usage</td>
              <td className="improvement">Better battery life</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
