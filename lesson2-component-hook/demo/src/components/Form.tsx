import {
  ReactNode,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  FormEvent,
} from "react";
import "./Form.css";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export const FormField = ({
  label,
  error,
  required,
  children,
}: FormFieldProps) => {
  return (
    <div className="form-field">
      <label className="form-label">
        {label}
        {required && <span className="required-mark">*</span>}
      </label>
      {children}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const TextInput = ({ error, ...props }: TextInputProps) => {
  return (
    <input
      {...props}
      className={`text-input ${error ? "has-error" : ""} ${
        props.className || ""
      }`}
    />
  );
};

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string }>;
  error?: string;
}

export const Select = ({ options, error, ...props }: SelectProps) => {
  return (
    <select
      {...props}
      className={`select-input ${error ? "has-error" : ""} ${
        props.className || ""
      }`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

interface FormProps {
  onSubmit: (e: FormEvent) => void;
  children: ReactNode;
}

export const Form = ({ onSubmit, children }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className="form">
      {children}
    </form>
  );
};
