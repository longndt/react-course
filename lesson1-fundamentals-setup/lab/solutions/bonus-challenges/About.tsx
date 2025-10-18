// Bonus Challenge 1 - About Component

import './About.css';

function About() {
  // Personal information variables
  const name = "Your Name";
  const major = "Your Major";
  const university = "Your University";
  const message = "Passionate about building modern web applications with React!";

  return (
    <div className="about">
      <h3>About Me</h3>
      <div className="about-content">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Major:</strong> {major}</p>
        <p><strong>University:</strong> {university}</p>
        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default About;
