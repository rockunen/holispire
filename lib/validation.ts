export interface PasswordStrength {
  score: number; // 0-4
  feedback: string[];
  isStrong: boolean;
}

export function validatePassword(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score++;
  } else {
    feedback.push("Password should be at least 8 characters");
  }

  if (/[a-z]/.test(password)) {
    score++;
  } else {
    feedback.push("Add lowercase letters");
  }

  if (/[A-Z]/.test(password)) {
    score++;
  } else {
    feedback.push("Add uppercase letters");
  }

  if (/[0-9]/.test(password)) {
    score++;
  } else {
    feedback.push("Add numbers");
  }

  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score++;
  }

  return {
    score: Math.min(score, 4),
    feedback,
    isStrong: score >= 3,
  };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhoneNumber(phone: string): boolean {
  // Remove common formatting characters
  const cleanPhone = phone.replace(/[\s\-()]/g, "");
  // Check if it's between 10-15 digits
  return /^\+?[0-9]{10,15}$/.test(cleanPhone);
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 50;
}
