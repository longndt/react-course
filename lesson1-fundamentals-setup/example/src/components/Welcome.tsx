// React import not needed with JSX Transform

interface WelcomeProps {
  name: string;
  age?: number;
  onGreet?: () => void;
}

function Welcome({ name, age, onGreet }: WelcomeProps) {
  return (
    <div className="welcome">
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old</p>}
      {onGreet && (
        <button onClick={onGreet} className="btn btn-primary">
          Say Hello
        </button>
      )}
    </div>
  );
}

export default Welcome;
