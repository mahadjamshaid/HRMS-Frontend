import React from "react";
import type { WorkHoursWidgetProps } from "../../../types/attendanceTypes";

const WorkHoursWidget = ({ checkInTime, checkOutTime, checkInTimeRaw, checkOutTimeRaw, workMinutes }: WorkHoursWidgetProps & { workMinutes?: number | null, checkInTimeRaw?: string | null, checkOutTimeRaw?: string | null }) => {
    let hoursStr = "-";
    let progressPercent = 0;

    if (typeof workMinutes === 'number') {
        const diffHrs = Math.floor(workMinutes / 60);
        const diffMins = workMinutes % 60;
        hoursStr = `${diffHrs}h ${diffMins}m`;
        progressPercent = Math.min((workMinutes / (8 * 60)) * 100, 100);
    } else if (checkInTimeRaw && checkOutTimeRaw) {
        // Fallback for real-time math using RAW ISO strings
        try {
            const checkIn = new Date(checkInTimeRaw);
            const checkOut = new Date(checkOutTimeRaw);
            
            if (!isNaN(checkIn.getTime()) && !isNaN(checkOut.getTime())) {
                const diffMs = checkOut.getTime() - checkIn.getTime();
                const diffMinsTotal = Math.floor(diffMs / 60000);
                const diffHrs = Math.floor(diffMinsTotal / 60);
                const diffMins = diffMinsTotal % 60;
                hoursStr = `${diffHrs}h ${diffMins}m`;
                progressPercent = Math.min((diffMinsTotal / (8 * 60)) * 100, 100);
            }
        } catch {
            hoursStr = "-";
        }
    }

    return (
        <div className="flex flex-col items-end gap-2">
            <span className="text-sm font-black text-slate-900">{hoursStr}</span>
            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
            </div>
        </div>
    );
};

export default WorkHoursWidget;
