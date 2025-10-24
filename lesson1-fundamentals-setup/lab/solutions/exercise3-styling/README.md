# Exercise 3 Solution - Component Styling

## Files in this solution

### Welcome.css
Complete CSS styling for the Welcome component with:
- **Gradient Background:**Purple gradient from #667eea to #764ba2
- **Typography:**White text with different opacities for hierarchy
- **Spacing:**Proper padding and margins for visual balance
- **Effects:**Border radius, box shadow for depth

### Welcome.tsx
Updated Welcome component that imports the CSS file

## Key Concepts Demonstrated

1. **CSS Imports:**Import CSS in component files
2. **Gradient Backgrounds:**Using `linear-gradient()`
3. **RGBA Colors:**Transparent colors with `rgba()`
4. **CSS Selectors:**Nested selectors (`.welcome h2`)
5. **Modern CSS:**Box shadow, border radius

## CSS Breakdown

### Gradient Background
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
- `135deg` - Diagonal gradient angle
- Two color stops: blue-purple to purple

### Transparency
```css
color: rgba(255, 255, 255, 0.9);
```
- RGB: 255, 255, 255 (white)
- Alpha: 0.9 (90% opaque)

### Box Shadow
```css
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
```
- X offset: 0, Y offset: 4px
- Blur: 6px
- Color: black with 10% opacity

## How to Use

1. Copy `Welcome.css` to `src/components/Welcome.css`
2. Copy `Welcome.tsx` to `src/components/Welcome.tsx`
3. Make sure the CSS import path is correct
4. Component should now have styled gradient background

## Expected Output

Browser should display:
- Purple gradient background (diagonal)
- White text with good contrast
- Rounded corners (12px radius)
- Subtle shadow effect
- Copyright text smaller and slightly faded

## Styling Tips

- Always import CSS at the top of the component file
- Use `className` (not `class`) in React
- Keep CSS files with the same name as component
- Use nested selectors for component-specific styles
