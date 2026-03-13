import { api } from "./api";


export async function analyzeResume(file, targetRole) {
  const payload = new FormData();
  payload.append("resume", file);
  payload.append("target_role", targetRole);

  const { data } = await api.post("/analyze-resume", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

