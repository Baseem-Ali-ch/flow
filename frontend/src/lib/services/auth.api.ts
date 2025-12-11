import { PUBLIC_BACKEND_API_URL } from "$env/static/public";

export const loginApi = async (email: string, password: string) => {
  const result = await fetch(`${PUBLIC_BACKEND_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return await result.json();
};

export const registerApi = async (
  username: string,
  email: string,
  phone: string,
  password: string
) => {
  const result = await fetch(`${PUBLIC_BACKEND_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, phone, password }),
  });
  console.log(result);

  return await result.json();
};

export const verifyEmailApi = async (token: string) => {
  const result = await fetch(`${PUBLIC_BACKEND_API_URL}/auth/verify-email?token=${token}`, {
    method: "GET",
  });

  return await result.json();
};
