// Exercise 4 Solution - Footer Component

import './Footer.css';

function Footer() {
  // Array of objects for resource links
  const links = [
    { name: "React Docs", url: "https://react.dev" },
    { name: "TypeScript", url: "https://www.typescriptlang.org" },
    { name: "Vite", url: "https://vitejs.dev" }
  ];

  return (
    <footer className="footer">
      <p>Useful Resources:</p>
      <div className="links">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
