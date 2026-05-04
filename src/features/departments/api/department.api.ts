import { apiRequest } from "../../../api/apiRequest";
import type {
  AssignDepartmentShiftPayload,
  CreateDepartmentPayload,
  Department,
  UpdateDepartmentPayload,
} from "../../../types/departmentTypes";

export const getDepartments = async () => {
  return apiRequest<Department[]>("/departments", { method: "GET" });
};

export const getDepartmentById = async (id: number | string) => {
  return apiRequest<Department>(`/departments/${id}`, { method: "GET" });
};

export const createDepartment = async (data: CreateDepartmentPayload) => {
  return apiRequest<Department>("/departments", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateDepartment = async (
  id: number | string,
  data: UpdateDepartmentPayload
) => {
  return apiRequest<Department>(`/departments/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const assignDepartmentShift = async (
  id: number | string,
  data: AssignDepartmentShiftPayload
) => {
  return apiRequest<Department>(`/departments/${id}/shift`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
