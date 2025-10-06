# Exercise 2 Solution - Welcome Component

## Files in this solution

### Welcome.jsx
- Creates a functional component named `Welcome`
- Defines three variables: `studentName`, `courseName`, `currentYear`
- Uses JSX to display dynamic content with `{}`
- Returns a div with welcome message

### App.jsx
- Imports the Welcome component
- Renders Welcome component inside the App div

## Key Concepts Demonstrated

1. **Component Creation:** Function component syntax
2. **Variables in JSX:** Embedding JavaScript with `{variableName}`
3. **Dynamic Data:** Using `new Date().getFullYear()` for current year
4. **Module System:** `export default` and `import`

## How to Use

1. Copy `Welcome.jsx` to `src/components/Welcome.jsx`
2. Copy `App.jsx` to `src/App.jsx`
3. Make sure you have `src/components/` folder created
4. Run `npm run dev` to see the result

## Expected Output

Browser should display:
- "Welcome, Student!" (or your name)
- "You're learning: React Fundamentals"
- "© 2024" (current year)

## Next Steps

- Personalize the `studentName` variable with your actual name
- Proceed to Exercise 3 to add styling
