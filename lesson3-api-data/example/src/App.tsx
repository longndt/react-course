import { useState, useEffect } from "react";
import ProductList from "./components/ProductList.tsx";
import ProductForm from "./components/ProductForm.tsx";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  // Start MSW in mock mode
  useEffect(() => {
    if (import.meta.env.MODE === 'mock') {
      import('./mocks/browser').then(({ worker }) => {
        worker.start({
          onUnhandledRequest: 'bypass',
        });
        console.log('MSW started in mock mode');
      });
    }
  }, []);

  const handleProductCreated = () => {
    setRefreshKey(prev => prev + 1);
    setShowForm(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Product Catalog</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Form" : "Add New Product"}
        </button>
      </header>

      <main className="app-main">
        {showForm && (
          <div className="form-section">
            <ProductForm onProductCreated={handleProductCreated} />
          </div>
        )}

        <div className="products-section">
          <ProductList key={refreshKey} />
        </div>
      </main>
    </div>
  );
}

export default App;