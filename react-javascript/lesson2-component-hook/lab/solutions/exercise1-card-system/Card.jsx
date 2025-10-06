import PropTypes from 'prop-types';
import "./Card.css";

// Main Card component with subcomponents
function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Card.Header subcomponent
Card.Header = function CardHeader({ children }) {
  return <div className="card-header">{children}</div>;
};

Card.Header.propTypes = {
  children: PropTypes.node.isRequired,
};

// Card.Body subcomponent
Card.Body = function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
};

Card.Body.propTypes = {
  children: PropTypes.node.isRequired,
};

// Card.Footer subcomponent
Card.Footer = function CardFooter({ children }) {
  return <div className="card-footer">{children}</div>;
};

Card.Footer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
