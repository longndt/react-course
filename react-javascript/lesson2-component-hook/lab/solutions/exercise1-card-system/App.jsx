import Card from "./Card";
import "./Card.css";

function App() {
  const handleLearnMore = () => {
    alert("Learn More clicked!");
  };

  const handleGetStarted = () => {
    alert("Get Started clicked!");
  };

  return (
    <div style={{ padding: "2rem", background: "#f0f4f8", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#2d3748", marginBottom: "2rem" }}>
        Card Component Demo
      </h1>

      {/* Product Card Example */}
      <Card>
        <Card.Header>React Compound Components</Card.Header>
        <Card.Body>
          <p>
            Master the art of building flexible and reusable components using the
            compound component pattern.
          </p>
          <p>
            This pattern allows you to create components that work together seamlessly
            while maintaining clean and intuitive APIs.
          </p>
        </Card.Body>
        <Card.Footer>
          <button className="btn-primary" onClick={handleGetStarted}>
            Get Started
          </button>
          <button className="btn-secondary" onClick={handleLearnMore}>
            Learn More
          </button>
        </Card.Footer>
      </Card>

      {/* Another Card Example */}
      <Card>
        <Card.Header>TypeScript Integration</Card.Header>
        <Card.Body>
          <p>
            Build type-safe React applications with full TypeScript support.
          </p>
          <p>
            Get autocompletion, type checking, and better developer experience.
          </p>
        </Card.Body>
        <Card.Footer>
          <button className="btn-primary" onClick={() => alert("Explore clicked!")}>
            Explore
          </button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default App;
