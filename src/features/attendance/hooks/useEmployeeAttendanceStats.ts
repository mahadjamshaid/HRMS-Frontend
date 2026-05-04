import { useMemo } from "react";
import type { AttendanceRecord } from "../../../types/attendanceTypes";

// TODO: Move to backend attendance.calculator.service
// This is a temporary frontend isolation for stats calculation until the backend provides it.
export const useEmployeeAttendanceStats = (records: AttendanceRecord[] = []) => {
    const stats = useMemo(() => {
        const total = records.length;
        const presentCount = records.filter(r => r.status === 'Present').length;
        const lateCount = records.filter(r => r.status === 'Late').length;
        
        return {
            total,
            present: presentCount,
            late: lateCount,
            leaves: 1 // Default mock until leave integration is added
        };
    }, [records]);

    return { stats };
};
