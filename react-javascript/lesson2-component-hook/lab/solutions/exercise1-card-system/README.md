# Exercise 1 Solution: Card Component System

Complete solution for the compound component pattern Card system.

##  Files Included

- `Card.jsx` - Main Card component with subcomponents
- `Card.css` - Complete styling with animations
- `App.jsx` - Usage examples

##  What This Solution Demonstrates

### Compound Component Pattern
The Card component uses the compound component pattern where:
- Main `Card` component acts as a container
- `Card.Header`, `Card.Body`, `Card.Footer` are subcomponents
- Each part can be used independently but works together

### Modern CSS Features
- Gradient backgrounds
- Box shadows with depth
- Smooth hover animations
- Responsive design
- Professional button styling

##  How to Use

### 1. Copy Files to Your Project

```bash
src/
├── components/
│   └── Card/
│       ├── Card.jsx
│       ├── Card.css
│       └── readme.md
└── App.jsx
```

### 2. Import and Use

```jsx
import Card from "./components/Card/Card";

function App() {
  return (
    <Card>
      <Card.Header>Card Title</Card.Header>
      <Card.Body>
        <p>Card content goes here</p>
      </Card.Body>
      <Card.Footer>
        <button>Action</button>
      </Card.Footer>
    </Card>
  );
}
```

### 3. Customize

You can customize the Card by:
- Adding className prop for custom styling
- Omitting any subcomponent (e.g., just Header + Body)
- Adding your own content in each section

##  Key Features

1. **Flexible Composition**: Use only the parts you need
2. **Type Safety**: Full TypeScript support
3. **Modern Design**: Gradients, shadows, animations
4. **Responsive**: Works on all screen sizes
5. **Reusable**: Can be used for products, profiles, articles, etc.

##  Customization Example

### Different Button Styles
```jsx
<Card.Footer>
  <button className="btn-primary">Primary</button>
  <button className="btn-secondary">Secondary</button>
</Card.Footer>
```

### Custom Card Style
```jsx
<Card className="featured-card">
  {/* Custom styling via className */}
</Card>
```

### Minimal Card (Header + Body only)
```jsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  {/* No footer */}
</Card>
```

##  Learning Points

- **Compound Components**: Components that work together as a system
- **Namespace Pattern**: `Card.Header` syntax for related components
- **TypeScript Interfaces**: Type definitions for props
- **CSS Transitions**: Smooth animations on hover
- **Flexible APIs**: Components can be composed in different ways

##  Code Highlights

### Function Component as Namespace
```jsx
function Card({ children, className }: CardProps) {
  return <div className={`card ${className}`}>{children}</div>;
}

Card.Header = function CardHeader({ children }: CardHeaderProps) {
  return <div className="card-header">{children}</div>;
};
```

This pattern allows you to:
- Keep related components together
- Provide intuitive API (`Card.Header`)
- Maintain TypeScript types

### Hover Animation
```css
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}
```

Creates a lift effect on hover for better UX.

##  Next Steps

After understanding this solution:
1. Try creating your own compound components
2. Add more subcomponents (e.g., Card.Image, Card.Actions)
3. Experiment with different styling
4. Build a grid of cards for a product catalog

This pattern is used in many UI libraries like:
- Material-UI (Card, CardContent, CardActions)
- Chakra UI (Card, CardHeader, CardBody)
- Ant Design (Card.Meta, Card.Grid)
