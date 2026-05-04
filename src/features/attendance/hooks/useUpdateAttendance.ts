import { useState } from "react";
import { updateAttendance } from "../api/attendance.api";
import type { UpdateAttendancePayload, UpdateAttendanceResult } from "../../../types/attendanceTypes";

export const useUpdateAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: number, payload: UpdateAttendancePayload): Promise<UpdateAttendanceResult> => {
    setLoading(true);
    setError(null);

    try {
      const res = await updateAttendance(id, payload);

      if (!res.ok) {
        const errorMsg = res.error || res.message || "Update failed";
        setError(errorMsg);

        return {
          success: false,
          data: res.data,
          error: errorMsg
        }
      }

      return {
        success: true,
        data: res.data,
        error: null
        
      };
    } catch {
      const errorMsg = "Network error occurred";
      setError(errorMsg);
      return {
        success: false,
        data: null,
        error: errorMsg,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    update,
    loading,
    error,
  };
};
