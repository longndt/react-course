import { useState, ChangeEvent, FormEvent } from "react";

// Form values interface
interface FormValues {
  [key: string]: string;
}

// Form errors interface
interface FormErrors {
  [key: string]: string;
}

// Validation rules type
type ValidationRules<T> = {
  [K in keyof T]?: (value: string) => string | undefined;
};

// useForm hook return type
interface UseFormReturn<T> {
  values: T;
  errors: FormErrors;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (callback: () => void) => (e: FormEvent) => void;
  resetForm: () => void;
}

// Generic useForm hook
function useForm<T extends FormValues>(
  initialValues: T,
  validationRules: ValidationRules<T>
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update values
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate field
    const validationRule = validationRules[name as keyof T];
    if (validationRule) {
      const error = validationRule(value);
      setErrors((prev) => ({
        ...prev,
        [name]: error || "",
      }));
    }
  };

  // Handle form submit
  const handleSubmit = (callback: () => void) => (e: FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    let hasErrors = false;

    Object.keys(validationRules).forEach((key) => {
      const validationRule = validationRules[key as keyof T];
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
