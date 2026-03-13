import { api } from "./api";


export async function registerUser(payload) {
  const { data } = await api.post("/register", payload);
  return data;
}


export async function loginUser(payload) {
  const { data } = await api.post("/login", payload);
  return data;
}


export async function getProfile() {
  const { data } = await api.get("/profile");
  return data;
}


export async function updateProfile(payload) {
  const { data } = await api.put("/profile", payload);
  return data;
}

