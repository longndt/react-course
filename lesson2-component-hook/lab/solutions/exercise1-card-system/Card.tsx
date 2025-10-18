import { ReactNode } from "react";
import "./Card.css";

// Main Card component with subcomponents
interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className = "" }: CardProps) {
  return <div className={`card ${className}`}>{children}</div>;
}

// Card.Header subcomponent
interface CardHeaderProps {
  children: ReactNode;
}

Card.Header = function CardHeader({ children }: CardHeaderProps) {
  return <div className="card-header">{children}</div>;
};

// Card.Body subcomponent
interface CardBodyProps {
  children: ReactNode;
}

Card.Body = function CardBody({ children }: CardBodyProps) {
  return <div className="card-body">{children}</div>;
};

// Card.Footer subcomponent
interface CardFooterProps {
  children: ReactNode;
}

Card.Footer = function CardFooter({ children }: CardFooterProps) {
  return <div className="card-footer">{children}</div>;
};

export default Card;
