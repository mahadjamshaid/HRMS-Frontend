import { useState, useCallback } from "react";
import { getAllAttendance } from "../api/attendance.api";
import type { AttendanceRecord } from "../../../types/attendanceTypes";

export const useAdminAttendanceRecords = () => {
    const [records, setRecords] = useState<AttendanceRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const fetchRecords = useCallback(async (page: number, limit = 10, dateFilter = "", statusFilter = "") => {
        setLoading(true);
        try {
            const res = await getAllAttendance(page, limit, dateFilter, statusFilter);
            if (res.ok && res.success) {
                setRecords(res.data?.records || []);
                setTotalPages(res.data?.totalPages || 1);
            }
        } catch (error) {
            console.error("Failed to fetch all attendance logs:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    return { records, loading, totalPages, fetchRecords };
};
