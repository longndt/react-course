# Lesson 2 Demo: Component Architecture & Hooks

This demo project showcases various reusable React components built with TypeScript. It demonstrates important React patterns and best practices.

## Components Showcased

### 1. DataTable

A flexible and reusable table component that supports:

- Sorting
- Filtering
- Custom cell rendering
- TypeScript integration
- Accessibility features

### 2. Form

A reusable form component with:

- Field validation
- Error handling
- TypeScript support
- Accessibility features
- Custom validation rules

### 3. Modal

A reusable modal component with:

- Keyboard support (Esc to close)
- Click outside to close
- Focus trapping
- Accessibility features
- TypeScript integration

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Run tests:

```bash
npm test
```

## Component Usage Examples

### DataTable

```jsx
// src/components/DataTable.jsx
<DataTable
  data={users}
  columns={[
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    {
      key: "status",
      header: "Status",
      render: (value) => <StatusBadge status={value} />,
    },
  ]}
/>
```

### Form

```jsx
// src/components/Form.jsx
<Form
  fields={[
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      validate: (value) => {
        if (!value.includes("@")) {
          return "Please enter a valid email";
        }
      },
    },
  ]}
  initialValues={{ email: "" }}
  onSubmit={handleSubmit}
/>
```

### Modal

```jsx
// src/components/Modal.jsx
<Modal isOpen={isOpen} onClose={handleClose} title="Edit User">
  <Form {...formProps} />
</Modal>
```

## Best Practices Demonstrated

1. Component Design

   - Single Responsibility Principle
   - Composition over Inheritance
   - Proper TypeScript Usage

2. State Management

   - Controlled Components
   - Custom Hooks
   - Proper Event Handling

3. Accessibility

   - ARIA Attributes
   - Keyboard Navigation
   - Screen Reader Support

4. Performance
   - Memoization
   - Event Handler Optimization
   - Proper Dependencies

## Testing

The components are tested using:

- Jest
- React Testing Library
- TypeScript Integration Tests

Run the tests with:

```bash
npm test
```

## Project Structure

```
src/
├── components/
│   ├── DataTable/
│   ├── Form/
│   └── Modal/
├── hooks/
├── types/
└── utils/
```

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Accessibility Guidelines](https://www.w3.org/WAI/ARIA/apg/)


