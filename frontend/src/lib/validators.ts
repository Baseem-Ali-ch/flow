export function validateEmail(email: string): string[] {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let errors: string[] = [];
  if (!email || email.trim() === "") {
    errors.push("Email is required");
  } else if (!emailRegex.test(email)) {
    errors.push("Invalid email format");
  }
  return errors;
}

export function validatePassword(password: string): string[] {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~]).{6,}$/;
  let errors: string[] = [];
  if (!password || password.trim() === "") {
    errors.push("Password is required");
  } else {
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }
  }
  return errors;
}

export function validatePhone(phone: string): string[] {
  const phoneRegex =
    /^\+?[1-9]\d{0,2}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  let errors: string[] = [];

  if (!phone || phone.trim() === "") {
    errors.push("Phone number is required");
  } else if (!phoneRegex.test(phone)) {
    errors.push("Phone number should 10");
  }

  return errors;
}

export function validateUsername(username: string): string[] {
  const userNameRegex = /^[a-zA-Z0-9_]{4,}$/;
  let errors: string[] = [];

  if (!username || username.trim() === "") {
    errors.push("Username is required");
  } else if (!userNameRegex.test(username)) {
    errors.push("Username must be at least 4 characters");
  }

  return errors;
}
