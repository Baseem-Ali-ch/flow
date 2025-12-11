import { PUBLIC_BACKEND_API_URL } from "$env/static/public";

export const getUsers = async () => {
  const result = await fetch(`${PUBLIC_BACKEND_API_URL}/users/admin`, {
    method: "GET",
  });
  return await result.json();
};
