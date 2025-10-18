// Exercise 3 Solution - Welcome Component with CSS

import './Welcome.css';  // Import CSS file

function Welcome() {
  const studentName = "Student";
  const courseName = "React Fundamentals";
  const currentYear = new Date().getFullYear();

  return (
    <div className="welcome">
      <h2>Welcome, {studentName}!</h2>
      <p>You're learning: {courseName}</p>
      <p className="small-text">© {currentYear}</p>
    </div>
  );
}

export default Welcome;
