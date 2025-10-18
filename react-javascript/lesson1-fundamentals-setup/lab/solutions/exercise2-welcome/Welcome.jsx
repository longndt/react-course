// Exercise 2 Solution - Welcome Component

function Welcome() {
  // Define variables for personalization
  const studentName = "Student";  // Replace with your name
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
