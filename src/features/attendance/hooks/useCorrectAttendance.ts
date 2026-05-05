import { useState } from "react";
import { correctAttendance } from "../api/attendance.api";
import type { AttendanceCorrectionPayload, UpdateAttendanceResult } from "../../../types/attendanceTypes";

export const useCorrectAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const correct = async (payload: AttendanceCorrectionPayload): Promise<UpdateAttendanceResult> => {
    setLoading(true);
    setError(null);

    try {
      const res = await correctAttendance(payload);

      if (!res.ok) {
        const errorMsg = res.error || res.message || "Correction failed";
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
    correct,
    loading,
    error,
  };
};
