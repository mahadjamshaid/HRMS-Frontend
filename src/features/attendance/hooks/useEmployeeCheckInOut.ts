import { useState, useCallback } from "react";
import { employeeCheckIn, employeeCheckOut, getTodayAttendance } from "../api/attendance.api";
import type { AttendanceRecord } from "../../../types/attendanceTypes";

export const useEmployeeCheckInOut = () => {
    const [attendance, setAttendance] = useState<AttendanceRecord | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchTodayAttendance = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getTodayAttendance();
            if (response.ok && response.success) {
                setAttendance(response.data ?? null);
            } else {
                setError(response.message || response.error || "Failed to load status");
            }
        } catch (err) {
            console.error("Failed to fetch today attendance:", err);
            setError("Failed to load attendance status");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleCheckIn = useCallback(async () => {
        if (loading) return false;
        setLoading(true);
        setError("");
        try {
            const response = await employeeCheckIn();
            if (response.ok && response.success) {
                setAttendance(response.data ?? null);
                return true;
            } else {
                setError(response.message || response.error || "Failed to check in");
                return false;
            }
        } catch (err) {
            console.error("Check-in error:", err);
            setError("Network error occurred during check-in");
            return false;
        } finally {
            setLoading(false);
        }
    }, [loading]);

    const handleCheckOut = useCallback(async () => {
        if (loading) return false;
        setLoading(true);
        setError("");
        try {
            const response = await employeeCheckOut();
            if (response.ok && response.success) {
                setAttendance(response.data ?? null);
                return true;
            } else {
                setError(response.message || response.error || "Failed to check out");
                return false;
            }
        } catch (err) {
            console.error("Check-out error:", err);
            setError("Network error occurred during check-out");
            return false;
        } finally {
            setLoading(false);
        }
    }, [loading]);

    return { 
        attendance, 
        loading, 
        error, 
        fetchTodayAttendance, 
        handleCheckIn, 
        handleCheckOut 
    };
};
