import { api } from "./api";


export async function getCourses() {
  const { data } = await api.get("/courses");
  return data.results || data;
}


export async function getCourseDetail(id) {
  const { data } = await api.get(`/course/${id}`);
  return data;
}


export async function getCourseProgress(id) {
  const { data } = await api.get(`/course/${id}/progress`);
  return data;
}

