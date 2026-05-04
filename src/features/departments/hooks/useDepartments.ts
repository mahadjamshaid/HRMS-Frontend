import { useCallback, useEffect, useState } from "react";
import { getDepartments } from "../api/department.api";
import { getApiMessage } from "../utils/departmentShift.utils";
import type { Department } from "../../../types/departmentTypes";

type UseDepartmentsOptions = {
  autoLoad?: boolean;
};

export const useDepartments = ({ autoLoad = true }: UseDepartmentsOptions = {}) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDepartments = useCallback(async () => {
    await Promise.resolve();
    setLoading(true);
    setError("");

    const response = await getDepartments();

    if (response.ok && response.success) {
      setDepartments(response.data || []);
    } else {
      setError(getApiMessage(response, "Failed to load departments"));
    }

    setLoading(false);
    return response;
  }, []);

  useEffect(() => {
    if (autoLoad) {
      const timer = setTimeout(() => {
        void fetchDepartments();
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [autoLoad, fetchDepartments]);

  return {
    departments,
    loading,
    error,
    setError,
    fetchDepartments,
  };
};
