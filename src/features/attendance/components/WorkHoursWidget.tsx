import React from "react";
import type { WorkHoursWidgetProps } from "../../../types/attendanceTypes";

const WorkHoursWidget = ({ checkInTime, checkOutTime, workMinutes }: WorkHoursWidgetProps & { workMinutes?: number | null }) => {
    let hoursStr = "-";
    let progressPercent = 0;

    if (typeof workMinutes === 'number') {
        const diffHrs = Math.floor(workMinutes / 60);
        const diffMins = workMinutes % 60;
        hoursStr = `${diffHrs}h ${diffMins}m`;
        progressPercent = Math.min((workMinutes / (8 * 60)) * 100, 100);
    } else if (checkInTime && checkOutTime) {
        const checkIn = new Date(checkInTime);
        const checkOut = new Date(checkOutTime);
        const diffMs = checkOut.getTime() - checkIn.getTime();
        const diffMinsTotal = Math.floor(diffMs / 60000);
        const diffHrs = Math.floor(diffMinsTotal / 60);
        const diffMins = diffMinsTotal % 60;
        hoursStr = `${diffHrs}h ${diffMins}m`;
        progressPercent = Math.min((diffMinsTotal / (8 * 60)) * 100, 100);
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
