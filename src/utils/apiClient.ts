import axios, { AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: "https://graph.facebook.com/v20.0",
});

export type FaceBookGraphApiError = {
  error: {
    message: string;
    code: number;
    type: string;
  };
};

apiClient.interceptors.response.use((response) => {
  if (response.data.error) {
    return Promise.reject({ response }); //enables us to handle all errors the same way, error.response?.data?.error
  }
  return Promise.resolve(response);
});

export { apiClient };
