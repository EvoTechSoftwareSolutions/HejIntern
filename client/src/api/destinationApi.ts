import api from "./api";

export const getDestinations = async () => {
  const response = await api.get("/destination");
  return response.data.data; 
};