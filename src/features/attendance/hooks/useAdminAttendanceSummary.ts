import { useState, useCallback, useEffect } from "react";
import { getAttendanceSummary } from "../api/attendance.api";
import type { AdminAttendanceSummary } from "../../../types/attendanceTypes";

export const useAdminAttendanceSummary = () => {
    const [summary, setSummary] = useState<AdminAttendanceSummary | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchSummary = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getAttendanceSummary();
            if (response.ok && response.success) {
                setSummary(response.data);
            } else {
                setError(response.message || "Failed to fetch summary");
            }
        } catch (err) {
            console.error("Summary fetch error:", err);
            setError("Network error fetching attendance summary");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSummary();
    }, [fetchSummary]);

    return { summary, loading, error, fetchSummary };
};
