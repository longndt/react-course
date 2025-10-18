import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import withLoading from "./withLoading";

// Product interface (matches ProductList component)
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

// Apply HOC to ProductList
const ProductListWithLoading = withLoading(ProductList);

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: "React Course",
          price: 49.99,
          description: "Learn React from basics to advanced patterns",
        },
        {
          id: 2,
          name: "TypeScript Guide",
          price: 39.99,
          description: "Master TypeScript for modern development",
        },
        {
          id: 3,
          name: "Web Development Bundle",
          price: 99.99,
          description: "Complete web development course package",
        },
        {
          id: 4,
          name: "Node.js Masterclass",
          price: 59.99,
          description: "Build scalable backend applications",
        },
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div style={{ padding: "2rem", background: "#f7fafc", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#2d3748", marginBottom: "2rem" }}>
        HOC Pattern Demo
      </h1>
      <ProductListWithLoading products={products} isLoading={isLoading} />
    </div>
  );
}

export default App;
