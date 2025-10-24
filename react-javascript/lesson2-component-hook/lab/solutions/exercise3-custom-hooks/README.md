# Exercise 3 Solution: Custom Hooks (useForm)

Complete solution for a reusable form management custom hook.

## Files Included

- `useForm.js` - Generic form hook with validation
- `RegistrationForm.jsx` - Registration form using the hook
- `RegistrationForm.css` - Form styling
- `App.jsx` - App entry point

## What This Solution Demonstrates

### Custom Hook Pattern
Custom hooks extract reusable logic into functions that:
- Start with `use` prefix
- Can use other React hooks
- Return stateful values and functions
- Are composable and testable

### Form Management Features
- **State Management** Values and errors
- **Real-time Validation** On input change
- **Submit Validation** Check all fields on submit
- **Form Reset** Clear all fields
- **Reusable** Works with any form structure

## How to Use

### 1. Define Form Structure

```jsx
/**
 * @typedef {Object} LoginFormValues
 * @property {string} email
 * @property {string} password
 */
```

### 2. Create Validation Rules

```jsx
const validationRules = {
  email: (value) => {
    if (!value) return "Email is required";
    if (!value.includes("@")) return "Invalid email";
    return undefined;
  },
  password: (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Too short";
    return undefined;
  },
};
```

### 3. Use the Hook

```jsx
const { values, errors, handleChange, handleSubmit } = useForm<LoginFormValues>(
  { email: "", password: "" },
  validationRules
);
```

### 4. Build Your Form

```jsx
<form onSubmit={handleSubmit(onSubmit)}>
  <input
    name="email"
    value={values.email}
    onChange={handleChange}
  />
  {errors.email && <span>{errors.email}</span>}

  <button type="submit">Login</button>
</form>
```

## Key Features

1. **Generic Hook** Works with any form structure
2. **Real-time Validation** Validates as user types
3. **Submit Validation** Full validation on submit
4. **Error Management** Clear error messages
5. **Form Reset** Reset to initial state
6. **Type Safety** TypeScript interfaces

## Hook API

### Parameters
```jsx
useForm<T>(initialValues: T, validationRules: ValidationRules<T>)
```

### Returns
```jsx
{
  values: T;                    // Current form values
  errors: FormErrors;           // Current errors
  handleChange: Function;       // Input change handler
  handleSubmit: Function;       // Form submit handler
  resetForm: Function;          // Reset form
}
```

### Validation Rules Format
```jsx
{
  fieldName: (value: string) => string | undefined;
}
```
- Return error message string if invalid
- Return undefined if valid

## Learning Points

- **Custom Hooks** Extract reusable stateful logic
- **Generics** Make hooks work with any data structure
- **Validation Pattern** Declarative validation rules
- **Event Handling** Type-safe event handlers
- **State Management** Managing related state together

## Code Highlights

### Generic Hook Definition
```jsx
function useForm<T extends FormValues>(
  initialValues: T,
  validationRules: ValidationRules<T>
): UseFormReturn<T> {
  // T = any object with string values
  // Works with any form structure
}
```

### Real-time Validation
```jsx
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setValues(prev => ({ ...prev, [name]: value }));

  // Validate immediately
  const rule = validationRules[name];
  const error = rule ? rule(value) : undefined;
  setErrors(prev => ({ ...prev, [name]: error }));
};
```

### Submit with Validation
```jsx
const handleSubmit = (callback: () => void) => (e: FormEvent) => {
  e.preventDefault();

  // Validate all fields
  const newErrors = validateAll();

  if (!hasErrors) {
    callback(); // Call success callback
  }
};
```

## Testing Checklist

- [ ] Form renders with empty fields
- [ ] Typing shows real-time validation
- [ ] Errors appear immediately on invalid input
- [ ] Submit validates all fields
- [ ] Valid submission shows success alert
- [ ] Form resets after successful submit
- [ ] Password mismatch detected
- [ ] All error messages clear

## Use Cases

### Contact Form
```jsx
/**
 * @typedef {Object} ContactFormValues
 * @property {string} name
 * @property {string} email
 * @property {string} message
 */

const { values, handleChange, handleSubmit } = useForm(
  { name: "", email: "", message: "" },
  contactValidationRules
);
```

### Login Form
```jsx
/**
 * @typedef {Object} LoginFormValues
 * @property {string} username
 * @property {string} password
 * @property {string} rememberMe
 */

const form = useForm(initialValues, loginRules);
```

### Profile Update
```jsx
/**
 * @typedef {Object} ProfileFormValues
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} bio
 * @property {string} avatar
 */

const form = useForm(currentProfile, profileRules);
```

## Extensions

### Add Custom Validation
```jsx
const onSubmit = () => {
  // Additional custom validation
  if (values.password !== values.confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  // Submit form
  api.register(values);
};
```

### Add Touched State
```jsx
const [touched, setTouched] = useState<Set<string>>(new Set());

const handleBlur = (e) => {
  setTouched(prev => new Set(prev).add(e.target.name));
};

// Show errors only after field is touched
{touched.has('email') && errors.email && <span>{errors.email}</span>}
```

### Async Validation
```jsx
const validateUsername = async (username: string) => {
  const exists = await api.checkUsername(username);
  return exists ? "Username taken" : undefined;
};
```

## Alternative Patterns

### Form Libraries
For complex forms, consider:
- **React Hook Form** Performance-focused
- **Formik** Full-featured form management
- **Final Form** Framework-agnostic

### When to Use Custom Hook
- Simple to medium complexity forms
- Learning React patterns
- No dependencies needed
- Full control over logic

### When to Use Library
- Library already in project
- Very complex forms
- Advanced features needed (arrays, nested objects)
- Team familiar with library

## Next Steps

After understanding this solution:
1. Add more validation types (async, cross-field)
2. Implement touched/dirty state
3. Add file upload support
4. Create validation helpers library
5. Try React Hook Form for comparison

This pattern demonstrates core React concepts used in all major form libraries!
