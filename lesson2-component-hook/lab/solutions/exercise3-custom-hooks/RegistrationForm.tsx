import useForm from "./useForm";
import "./RegistrationForm.css";

interface RegistrationFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegistrationForm() {
  // Validation rules
  const validationRules = {
    username: (value: string) => {
      if (!value.trim()) return "Username is required";
      if (value.length < 3) return "Username must be at least 3 characters";
      return undefined;
    },
    email: (value: string) => {
      if (!value.trim()) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Invalid email format";
      return undefined;
    },
    password: (value: string) => {
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      return undefined;
    },
    confirmPassword: (value: string) => {
      if (!value) return "Please confirm your password";
      // This will be checked separately
      return undefined;
    },
  };

  // Use custom hook
  const { values, errors, handleChange, handleSubmit, resetForm } =
    useForm<RegistrationFormValues>(
      {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationRules
    );

  // Submit handler
  const onSubmit = () => {
    // Additional validation: password match
    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form submitted:", values);
    alert(`Registration successful! Welcome, ${values.username}!`);
    resetForm();
  };

  return (
    <div className="form-container">
      <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">Create Account</h2>

        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            className={errors.username ? "input-error" : ""}
            placeholder="Enter username"
          />
          {errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
            placeholder="Enter email"
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className={errors.password ? "input-error" : ""}
            placeholder="Enter password"
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "input-error" : ""}
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
