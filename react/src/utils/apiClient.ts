import axios, { AxiosError } from "axios";
import packageJson from "../../../package.json";
import { toast } from "./toast";

export const apiClient = axios.create({
  baseURL: `https://localhost:3000/plugins/${packageJson.name}/${packageJson.version}/api`,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error: AxiosError<any>) => {
    if (error.response?.status === 401 && error.config?.url !== "/auth/login") {
      toast({
        message: "Session expired, please login again",
        severity: "warning",
      });
      window.location.href = "/login";
    } else {
      toast({
        message: error.response?.data?.message ?? error.message,
        severity: "error",
      });
    }

    return Promise.reject(error);
  }
);
