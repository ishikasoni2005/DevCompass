const AUTH_KEY = "devcompass-auth";


export function getStoredAuth() {
  const rawValue = localStorage.getItem(AUTH_KEY);
  if (!rawValue) {
    return null;
  }
  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}


export function persistAuth(tokens) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(tokens));
}


export function clearAuthStorage() {
  localStorage.removeItem(AUTH_KEY);
}
