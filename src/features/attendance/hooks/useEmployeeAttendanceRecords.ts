import { useState, useCallback } from "react";
import { getMyRecords } from "../api/attendance.api";
import type { AttendanceRecord } from "../../../types/attendanceTypes";

export const useEmployeeAttendanceRecords = () => {
    const [records, setRecords] = useState<AttendanceRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchRecords = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getMyRecords();
            if (response.ok && response.success) {
                setRecords(response.data || []);
            } else {
                setError(response.message || response.error || "Failed to fetch records");
            }
        } catch (err) {
            console.error("Failed to fetch employee attendance records:", err);
            setError("Something went wrong while fetching history");
        } finally {
            setLoading(false);
        }
    }, []);

    return { records, loading, error, fetchRecords };
};
