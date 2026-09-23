/** Name, Title, Phone, Email are required before "Generate My Card" unlocks. */
export function validateCardData(data) {
  const errors = {};

  if (!data.name?.trim()) errors.name = "Full name is required.";
  if (!data.title?.trim()) errors.title = "Job title is required.";

  if (!data.phone?.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\+?[0-9][0-9\s\-()]{6,18}$/.test(data.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!data.email?.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
}