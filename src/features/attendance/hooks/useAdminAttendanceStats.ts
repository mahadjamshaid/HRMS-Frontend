import { useState, useCallback } from "react";
import { getAdminStats, getAllAttendance } from "../api/attendance.api";
import type { AttendanceRecord } from "../../../types/attendanceTypes";

type DashboardStat = {
    label: string;
    value: string;
    trend: string;
    color: string;
    bg: string;
};

export const useAdminAttendanceStats = () => {
    const [stats, setStats] = useState<DashboardStat[]>([
        { label: "Total Employees", value: "0", trend: "Active", color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Present Today", value: "0", trend: "On Time", color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Absent Today", value: "0", trend: "No Record", color: "text-rose-600", bg: "bg-rose-50" },
        { label: "Late Arrivals", value: "0", trend: "Past 9:15 AM", color: "text-amber-600", bg: "bg-amber-50" }
    ]);
    const [recentAttendance, setRecentAttendance] = useState<AttendanceRecord[]>([]);

    const fetchStatsAndRecent = useCallback(async () => {
        try {
            const statsRes = await getAdminStats();
            if (statsRes.ok && statsRes.success && statsRes.data) {
                const data = statsRes.data;
                setStats([
                    { label: "Total Employees", value: data.totalEmployees.toString(), trend: "Active", color: "text-indigo-600", bg: "bg-indigo-50" },
                    { label: "Present Today", value: data.presentToday.toString(), trend: "On Time", color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Absent Today", value: data.absentToday.toString(), trend: "No Record", color: "text-rose-600", bg: "bg-rose-50" },
                    { label: "Late Arrivals", value: data.lateToday.toString(), trend: "Past 9:15 AM", color: "text-amber-600", bg: "bg-amber-50" }
                ]);
            }

            const attendanceRes = await getAllAttendance(1, 5);
            if (attendanceRes.ok && attendanceRes.success) {
                setRecentAttendance(attendanceRes.data?.records || []);
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    }, []);

    return { stats, recentAttendance, fetchStatsAndRecent };
};
