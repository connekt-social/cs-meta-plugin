import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://graph.facebook.com/v20.0",
});
