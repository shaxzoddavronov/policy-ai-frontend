export interface ValidationError {
  field: string;
  message: string;
}

export interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim() === '') return `${fieldName} is required`;
  return null;
};

export const validateName = (name: string, fieldName: string): string | null => {
  const required = validateRequired(name, fieldName);
  if (required) return required;
  
  if (name.length < 2) return `${fieldName} must be at least 2 characters long`;
  if (name.length > 50) return `${fieldName} must be less than 50 characters`;
  if (!/^[a-zA-Z\s]+$/.test(name)) return `${fieldName} can only contain letters and spaces`;
  
  return null;
};

export const validateForm = (formData: FormData, isLogin: boolean): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Email validation
  const emailError = validateEmail(formData.email);
  if (emailError) {
    errors.push({ field: 'email', message: emailError });
  }

  // Password validation
  const passwordError = validatePassword(formData.password);
  if (passwordError) {
    errors.push({ field: 'password', message: passwordError });
  }

  // Name validation (only for registration)
  if (!isLogin) {
    const firstNameError = validateName(formData.first_name, 'First name');
    if (firstNameError) {
      errors.push({ field: 'first_name', message: firstNameError });
    }

    const lastNameError = validateName(formData.last_name, 'Last name');
    if (lastNameError) {
      errors.push({ field: 'last_name', message: lastNameError });
    }
  }

  return errors;
};

export const getFieldError = (errors: ValidationError[], fieldName: string): string | null => {
  const error = errors.find(err => err.field === fieldName);
  return error ? error.message : null;
}; 