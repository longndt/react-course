export default function Contact() {
  return (
    <div className="page-container">
      <h1>Contact Us</h1>
      <div className="content-card">
        <p>Get in touch with our team!</p>

        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <div>
              <h3>Email</h3>
              <p>contact@myapp.com</p>
            </div>
          </div>

          <div className="contact-item">
            <span className="contact-icon"></span>
            <div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <div>
              <h3>Address</h3>
              <p>123 React Street, Web City, 12345</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send us a message</h2>
          <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows={5} required></textarea>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
