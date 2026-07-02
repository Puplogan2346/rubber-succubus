/** Shared form validation helpers used by the Connect and Checkout forms. */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

/** Returns an error message for an email field, or undefined if valid. */
export function emailError(value: string): string | undefined {
  if (!value.trim()) return "Email is required";
  if (!isValidEmail(value)) return "Please enter a valid email address";
  return undefined;
}

/** Returns an error message for a required text field, or undefined if valid. */
export function requiredText(value: string, label: string, minLength = 1): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return `${label} is required`;
  if (trimmed.length < minLength) return `${label} must be at least ${minLength} characters`;
  return undefined;
}
