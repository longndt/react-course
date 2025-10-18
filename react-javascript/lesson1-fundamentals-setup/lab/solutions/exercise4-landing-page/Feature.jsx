// Exercise 4 Solution - Feature Component

import './Feature.css';

function Feature() {
  // Array of features to display
  const features = [
    "Learn React fundamentals",
    "Build modern web applications",
    "Use TypeScript for type safety"
  ];

  return (
    <div className="features">
      <h3>What You'll Learn</h3>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}

export default Feature;
