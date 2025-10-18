# Exercise 4 Solution - Complete Landing Page

## Files in this solution

### Feature.jsx
- Creates a list of features using array mapping
- Demonstrates `.map()` method for rendering lists
- Uses `key` prop for list items (required by React)

### Feature.css
- Light gray background (#f8f9fa)
- List items styled as cards with left border accent
- Subtle shadows for depth

### Footer.jsx
- Maps over an array of objects (not just strings)
- Creates external links with proper attributes
- Uses `target="_blank"` and `rel="noopener noreferrer"` for security

### Footer.css
- Flexbox layout for horizontal links
- Hover effects for better UX
- Responsive with `flex-wrap`

### App.jsx
- Imports all three components
- Composes them into complete landing page
- Demonstrates component composition

## Key Concepts Demonstrated

### 1. Array Mapping
```jsx
{features.map((feature, index) => (
  <li key={index}>{feature}</li>
))}
```
- Transforms array into JSX elements
- `key` prop required for React's reconciliation

### 2. Object Arrays
```jsx
const links = [
  { name: "React Docs", url: "https://react.dev" },
  // ...
];
```
- More complex data structures
- Access properties with `link.name`, `link.url`

### 3. External Links
```jsx
<a
  href={link.url}
  target="_blank"
  rel="noopener noreferrer"
>
```
- `target="_blank"` opens in new tab
- `rel="noopener noreferrer"` prevents security vulnerabilities

### 4. Component Composition
```jsx
<Welcome />
<Feature />
<Footer />
```
- Building complex UIs from simple components
- Each component is independent and reusable

## Project Structure

```
my-welcome-page/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── components/
│   │   ├── Welcome.jsx
│   │   ├── Welcome.css
│   │   ├── Feature.jsx
│   │   ├── Feature.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   └── main.jsx
└── ...
```

## How to Use

1. **Copy all component files:**
   - `Feature.jsx` → `src/components/Feature.jsx`
   - `Feature.css` → `src/components/Feature.css`
   - `Footer.jsx` → `src/components/Footer.jsx`
   - `Footer.css` → `src/components/Footer.css`

2. **Update App.jsx:**
   - Copy `App.jsx` to `src/App.jsx`

3. **Make sure Welcome component is complete** (from Exercise 2 & 3)

4. **Run the app:**
   ```bash
   npm run dev
   ```

## Expected Output

Complete landing page with three sections:

1. **Welcome Section (Top):**
   - Purple gradient background
   - Welcome message with name
   - Course name and year

2. **Features Section (Middle):**
   - Light gray background
   - "What You'll Learn" heading
   - 3 feature items with blue left border

3. **Footer Section (Bottom):**
   - Border on top
   - "USEFUL RESOURCES:" label
   - 3 clickable links (React Docs, TypeScript, Vite)
   - Links change color on hover

## Testing Checklist

- [ ] All three sections visible
- [ ] Welcome has gradient background
- [ ] Features show 3 items in a list
- [ ] Footer has 3 clickable links
- [ ] Links open in new tab
- [ ] Hover effects work
- [ ] No console errors
- [ ] Page is centered and responsive

## Common Issues

### Links not clickable
- Check `href` attribute has the URL
- Verify `<a>` tag is used (not `<button>`)

### Map key warning
- Make sure each mapped element has `key` prop
- Use `key={index}` for simple lists

### Components not showing
- Verify all imports are correct
- Check component names match (case-sensitive)
- Make sure components are exported with `export default`

## Next Steps

- Try customizing the features array with your own items
- Add more links to the footer
- Experiment with different color schemes
- Add more sections (About, Contact, etc.)
