import { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleProductAdded = () => {
    // Trigger refresh of product list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🛍️ Product Catalog</h1>
        <p>React + Express + MongoDB Integration Demo</p>
      </header>

      <main className="App-main">
        <div className="container">
          <ProductForm onProductAdded={handleProductAdded} />
          <ProductList key={refreshTrigger} />
        </div>
      </main>

      <footer className="App-footer">
        <p>Lesson 3: API Integration with Axios</p>
      </footer>
    </div>
  );
}

export default App;

