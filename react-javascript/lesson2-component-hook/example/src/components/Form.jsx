import PropTypes from "prop-types";
import "./Form.css";

export const FormField = ({ label, error, required, children }) => {
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

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export const TextInput = ({ error, ...props }) => {
  return (
    <input
      {...props}
      className={`text-input ${error ? "has-error" : ""} ${
        props.className || ""
      }`}
    />
  );
};

TextInput.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
};

export const Select = ({ options, error, ...props }) => {
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

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  error: PropTypes.string,
  className: PropTypes.string,
};

export const Form = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="form">
      {children}
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
