import { apiRequest } from "../../../api/apiRequest";

export const attendanceService = {
  get: <T>(url: string) => apiRequest<T>(url, { method: "GET" }),

  post: <TResponse, TRequest = unknown>(url: string, data?: TRequest) =>
    apiRequest<TResponse>(url, {
      method: "POST",
      body: JSON.stringify(data || {}),
    }),

  put: <TResponse, TRequest = unknown>(url: string, data?: TRequest) =>
    apiRequest<TResponse>(url, {
      method: "PUT",
      body: JSON.stringify(data || {}),
    }),
};
