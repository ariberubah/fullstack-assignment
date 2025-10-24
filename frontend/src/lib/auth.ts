export const API_URL = "http://localhost:8787/api";

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const setToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("token", token);
};

export const clearToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
};

export const isLoggedIn = (): boolean => !!getToken();
