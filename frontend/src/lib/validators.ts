export function emailValidator(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let error: string;
  if (!email || email.trim() === "") {
    return (error = "Email is required");
  } else if (!emailRegex.test(email)) {
    return (error = "Invalid email format");
  }
}

export function passwordValidator(password: string) {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~]).{6,}$/;
  let error: string;

  if (!password || password.trim() === "") {
    return (error = "Password is required");
  }

  if (password.length < 6) {
    return (error = "Password must be at least 6 characters");
  }

  if (!/[A-Z]/.test(password)) {
    return (error = "Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    return (error = "Password must contain at least one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    return (error = "Password must contain at least one number");
  }

  if (!/[!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~]/.test(password)) {
    return (error = "Password must contain at least one special character");
  }

}

export function confirmPasswordValidator(
  password: string,
  confirmPassword: string
) {
  let error: string;
  if (!confirmPassword || confirmPassword.trim() === "") {
    return (error = "Confirm password is required");
  } else if (confirmPassword !== password) {
    return (error = "Password do not match");
  }
}

export function phoneNumberValidator(phone: string) {
  const phoneRegex = /^[1-9]\d{9}$/;
  let error: string;

  if (!phone || phone.trim() === "") {
    return (error = "Phone number is required");
  } else if (!phoneRegex.test(phone)) {
    return (error = "Phone number should 10 numbers");
  }
}

export function usernameValidator(username: string) {
  const userNameRegex = /^[a-zA-Z0-9_]{4,}$/;
  let error: string;

  if (!username || username.trim() === "") {
    return (error = "Username is required");
  } else if (!userNameRegex.test(username)) {
    return (error = "Username must be at least 4 characters");
  }
}
