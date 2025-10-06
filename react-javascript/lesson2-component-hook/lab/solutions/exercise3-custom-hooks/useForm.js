import { useState } from "react";

/**
 * Custom hook for form handling with validation
 * @param {Object} initialValues - Initial form values
 * @param {Object} validationRules - Validation rules for each field
 * @returns {Object} Form state and handlers
 */
function useForm(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update values
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate field
    const validationRule = validationRules[name];
    if (validationRule) {
      const error = validationRule(value);
      setErrors((prev) => ({
        ...prev,
        [name]: error || "",
      }));
    }
  };

  // Handle form submit
  const handleSubmit = (callback) => (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    let hasErrors = false;

    Object.keys(validationRules).forEach((key) => {
      const validationRule = validationRules[key];
      if (validationRule) {
        const error = validationRule(values[key] || "");
        if (error) {
          newErrors[key] = error;
          hasErrors = true;
        }
      }
    });

    setErrors(newErrors);

    // If no errors, call callback
    if (!hasErrors) {
      callback();
    }
  };

  // Reset form
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
}

export default useForm;
