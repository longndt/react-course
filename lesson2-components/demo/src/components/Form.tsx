import React from "react";
import "./Form.css";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required,
  children,
}) => {
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

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ error, ...props }) => {
  return (
    <input
      {...props}
      className={`text-input ${error ? "has-error" : ""} ${
        props.className || ""
      }`}
    />
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string }>;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({ options, error, ...props }) => {
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

interface Form {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

export const Form: React.FC<Form> = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="form">
      {children}
    </form>
  );
};
