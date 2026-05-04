import React from "react";
import type { WorkHoursWidgetProps } from "../../../types/attendanceTypes";

const WorkHoursWidget = ({ checkInTime, checkOutTime }: WorkHoursWidgetProps) => {
    const checkIn = checkInTime ? new Date(checkInTime) : null;
    const checkOut = checkOutTime ? new Date(checkOutTime) : null;

    let hoursStr = "-";
    let progressPercent = 0;

    if (checkIn && checkOut) {
        const diffMs = checkOut.getTime() - checkIn.getTime();
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.round((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        hoursStr = `${diffHrs}h ${diffMins}m`;
        progressPercent = Math.min((diffMs / (9 * 60 * 60 * 1000)) * 100, 100);
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
