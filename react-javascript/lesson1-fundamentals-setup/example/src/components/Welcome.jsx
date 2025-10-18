import React from 'react';

function Welcome({ name, age, onGreet }) {
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
