import { useState } from "react";
import {
  assignDepartmentShift,
  createDepartment,
  updateDepartment,
} from "../api/department.api";
import { getApiMessage } from "../utils/departmentShift.utils";
import type { ApiResponse } from "../../../types/api";
import type {
  AssignDepartmentShiftPayload,
  CreateDepartmentPayload,
  Department,
  UpdateDepartmentPayload,
} from "../../../types/departmentTypes";

type DepartmentMutationResponse = ApiResponse<Department>;

type DepartmentMutationResult = {
  success: boolean;
  response: DepartmentMutationResponse;
};

export const useDepartmentMutations = () => {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const clearFeedback = () => {
    setMessage("");
    setError("");
  };

  const runMutation = async (
    request: () => Promise<DepartmentMutationResponse>,
    successFallback: string,
    errorFallback: string
  ): Promise<DepartmentMutationResult> => {
    setSaving(true);
    clearFeedback();

    const response = await request();

    if (response.ok && response.success) {
      setMessage(getApiMessage(response, successFallback));
      setSaving(false);
      return { success: true, response };
    }

    setError(getApiMessage(response, errorFallback));
    setSaving(false);
    return { success: false, response };
  };

  const createDepartmentRecord = (payload: CreateDepartmentPayload) => {
    return runMutation(
      () => createDepartment(payload),
      "Department created successfully",
      "Failed to create department"
    );
  };

  const updateDepartmentRecord = (id: number | string, payload: UpdateDepartmentPayload) => {
    return runMutation(
      () => updateDepartment(id, payload),
      "Department updated successfully",
      "Failed to update department"
    );
  };

  const assignShiftRecord = (id: number | string, payload: AssignDepartmentShiftPayload) => {
    return runMutation(
      () => assignDepartmentShift(id, payload),
      "Shift assigned successfully",
      "Failed to assign shift"
    );
  };

  return {
    saving,
    message,
    error,
    setError,
    clearFeedback,
    createDepartmentRecord,
    updateDepartmentRecord,
    assignShiftRecord,
  };
};
