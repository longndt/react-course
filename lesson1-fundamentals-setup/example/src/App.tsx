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
      <header className="app-header">
        <h1>React Fundamentals Demo</h1>
        <p>TypeScript + React + Vite</p>
      </header>

      <main className="app-main">
        <section className="demo-section">
          <h2>1. Welcome Component</h2>
          <Welcome
            name={user.name}
            age={25}
            onGreet={handleGreet}
          />
        </section>

        <section className="demo-section">
          <h2>2. Counter Component</h2>
          <Counter />
        </section>

        <section className="demo-section">
          <h2>3. User Profile Component</h2>
          <UserProfile user={user} onUpdate={handleUpdate} />
        </section>

        <section className="demo-section">
          <h2>4. Button Component</h2>
          <div className="button-demo">
            <Button onClick={handleButtonClick}>
              Primary Button
            </Button>
            <Button variant="secondary" onClick={handleButtonClick}>
              Secondary Button
            </Button>
            <Button variant="danger" onClick={handleButtonClick}>
              Danger Button
            </Button>
            <Button size="sm" onClick={handleButtonClick}>
              Small Button
            </Button>
            <Button size="lg" onClick={handleButtonClick}>
              Large Button
            </Button>
            <Button disabled onClick={handleButtonClick}>
              Disabled Button
            </Button>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Edit <code>src/App.tsx</code> and save to test HMR</p>
      </footer>
    </div>
  );
}

export default App;
