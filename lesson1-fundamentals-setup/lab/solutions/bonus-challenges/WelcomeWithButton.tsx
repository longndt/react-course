// Bonus Challenge 2 - Welcome Component with Click Handler

import './Welcome.css';

function Welcome() {
  const studentName = "Student";
  const courseName = "React Fundamentals";
  const currentYear = new Date().getFullYear();

  // Event handler function
  const handleClick = () => {
    alert('Welcome to React! ');
  };

  return (
    <div className="welcome">
      <h2>Welcome, {studentName}!</h2>
      <p>You're learning: {courseName}</p>
      <button onClick={handleClick} className="welcome-button">
        Click Me!
      </button>
      <p className="small-text">© {currentYear}</p>
    </div>
  );
}

export default Welcome;
