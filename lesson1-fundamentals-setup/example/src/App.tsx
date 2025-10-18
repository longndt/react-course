import { useState } from 'react';
import Welcome from './components/Welcome';
import Counter from './components/Counter';
import UserProfile from './components/UserProfile';
import Button from './components/Button';
import './App.css';

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function App() {
  const [user, setUser] = useState<User>({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    isActive: true
  });

  const handleGreet = () => {
    alert(`Hello, ${user.name}!`);
  };

  const handleUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    console.log('User updated:', updatedUser);
  };

  const handleButtonClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="app">
      <header className="app-header" role="banner">
        <h1>React Fundamentals Demo</h1>
        <p>TypeScript + React + Vite</p>
      </header>

      <main className="app-main" role="main">
        <section className="demo-section" aria-labelledby="welcome-heading">
          <h2 id="welcome-heading">1. Welcome Component</h2>
          <Welcome
            name={user.name}
            age={25}
            onGreet={handleGreet}
          />
        </section>

        <section className="demo-section" aria-labelledby="counter-heading">
          <h2 id="counter-heading">2. Counter Component</h2>
          <Counter />
        </section>

        <section className="demo-section" aria-labelledby="profile-heading">
          <h2 id="profile-heading">3. User Profile Component</h2>
          <UserProfile user={user} onUpdate={handleUpdate} />
        </section>

        <section className="demo-section" aria-labelledby="button-heading">
          <h2 id="button-heading">4. Button Component</h2>
          <div className="button-demo" role="group" aria-label="Button examples">
            <Button
              onClick={handleButtonClick}
              ariaLabel="Primary action button"
            >
              Primary Button
            </Button>
            <Button
              variant="secondary"
              onClick={handleButtonClick}
              ariaLabel="Secondary action button"
            >
              Secondary Button
            </Button>
            <Button
              variant="danger"
              onClick={handleButtonClick}
              ariaLabel="Danger action button - use with caution"
            >
              Danger Button
            </Button>
            <Button
              size="sm"
              onClick={handleButtonClick}
              ariaLabel="Small primary button"
            >
              Small Button
            </Button>
            <Button
              size="lg"
              onClick={handleButtonClick}
              ariaLabel="Large primary button"
            >
              Large Button
            </Button>
            <Button
              disabled
              onClick={handleButtonClick}
              ariaLabel="Disabled button - currently unavailable"
            >
              Disabled Button
            </Button>
          </div>
        </section>
      </main>

      <footer className="app-footer" role="contentinfo">
        <p>Edit <code>src/App.tsx</code> and save to test HMR</p>
      </footer>
    </div>
  );
}

export default App;
