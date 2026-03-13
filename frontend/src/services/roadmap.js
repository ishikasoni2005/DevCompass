import { api } from "./api";


export async function getUserRoadmaps() {
  const { data } = await api.get("/user-roadmap");
  return data.results || data;
}


export async function generateRoadmap(payload) {
  const { data } = await api.post("/generate-roadmap", payload);
  return data;
}

