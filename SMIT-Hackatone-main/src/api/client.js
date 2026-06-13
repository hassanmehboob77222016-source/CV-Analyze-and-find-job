import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

function extractErrorMessage(data, fallback) {
  if (!data) return fallback;
  if (typeof data === "string") return data;
  if (typeof data.detail === "string") return data.detail;
  if (Array.isArray(data.detail)) {
    return data.detail.map((item) => item.msg || JSON.stringify(item)).join(", ");
  }
  if (data.detail && typeof data.detail === "object" && data.detail.detail) {
    return String(data.detail.detail);
  }
  if (data.error && data.detail) return String(data.detail);
  return fallback;
}

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 120000,
});

export const checkHealth = async () => {
  try {
    const res = await api.get("/api/health");
    return { success: true, data: res.data };
  } catch {
    return { success: false, error: "Backend offline" };
  }
};

export const uploadCV = async (file) => {
  try {
    if (file?.__samplePayload) {
      return { success: true, data: file.__samplePayload };
    }

    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/api/cv/upload", formData, {
      // Allow Axios to generate the proper multipart boundary header.
      timeout: 30000,
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message);
    return {
      success: false,
      error: extractErrorMessage(error.response?.data, "Upload failed"),
    };
  }
};

export const loadSampleCV = async () => {
  try {
    const response = await api.post("/api/cv/sample");
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: extractErrorMessage(error.response?.data, "Failed to load sample"),
    };
  }
};

export const searchJobs = async (cvText) => {
  try {
    const response = await api.post(
      "/api/jobs/search",
      { cv_text: cvText },
      { headers: { "Content-Type": "application/json" }, timeout: 120000 }
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Search error:", error.response?.data || error.message);
    return {
      success: false,
      error: extractErrorMessage(error.response?.data, "Search failed"),
    };
  }
};

export default api;
