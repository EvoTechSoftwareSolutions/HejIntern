import api from "./api";

export const getThemes = async () => {
  const response = await api.get("/themes");
  return response.data.data; 
};