import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../utils/auth.utils";
import { useEmployeeAttendanceRecords } from "../../features/attendance/hooks/useEmployeeAttendanceRecords";
import { useEmployeeAttendanceStats } from "../../features/attendance/hooks/useEmployeeAttendanceStats";
import { useEmployeeCheckInOut } from "../../features/attendance/hooks/useEmployeeCheckInOut";
import { useEmployeeMonthlyHours } from "../../features/attendance/hooks/useEmployeeMonthlyHours";
import AttendanceViewEmployee from "../../features/attendance/components/AttendanceView.employee";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Badge from "../../components/Badge";

import { useLiveTimer } from "../../features/attendance/hooks/useLiveTimer";

const EmployeeDashboardPage = () => {
    const user = getUser();

    const { records, loading: recordsLoading, fetchRecords } = useEmployeeAttendanceRecords();
    const { stats } = useEmployeeAttendanceStats(records);
    
    const { 
        attendance, 
        loading: actionLoading, 
        error: actionError, 
        fetchTodayAttendance, 
        handleCheckIn, 
        handleCheckOut 
    } = useEmployeeCheckInOut();

    const { elapsedMinutes, formatElapsed } = useLiveTimer(attendance?.checkInTimeRaw && !attendance.checkOutTime ? attendance.checkInTimeRaw : null);
    const monthlyHours = useEmployeeMonthlyHours(records, attendance, elapsedMinutes);

    useEffect(() => {
        fetchTodayAttendance();
        fetchRecords();
    }, [fetchTodayAttendance, fetchRecords]);

    const onCheckIn = async () => {
        const success = await handleCheckIn();
        if (success) fetchRecords();
    };

    const onCheckOut = async () => {
        const success = await handleCheckOut();
        if (success) fetchRecords();
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-1000">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] -mr-32 -mt-32 transition-colors group-hover:bg-indigo-500/40"></div>
                    <div className="relative z-10">
                        <h3 className="text-4xl font-black tracking-tighter mb-4">Hello, {user?.username}!</h3>
                        <p className="text-slate-400 max-w-md text-lg leading-relaxed mb-10">You've maintained a <span className="text-white font-black">{stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0}%</span> consistency rate this month. Outstanding!</p>
                        <div className="flex gap-4">
                            <Button variant="secondary" size="lg">Complete Profile</Button>
                            <Button className="bg-slate-800 hover:bg-slate-700 shadow-none" size="lg">Settings</Button>
                        </div>
                    </div>
                    <div className="absolute right-12 bottom-12 opacity-10 animate-float">
                        <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
                    </div>
                </div>

                <Card className="flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="font-black text-slate-900 uppercase tracking-widest text-[10px]">Active Session</h3>
                            <Badge variant={attendance ? (attendance.checkOutTime ? 'neutral' : 'success') : 'danger'}>
                                {attendance ? (attendance.checkOutTime ? 'Shift Ended' : 'On Duty') : 'Off Duty'}
                            </Badge>
                        </div>
                        {actionError && <p className="text-[10px] font-black text-rose-500 mb-6 animate-pulse uppercase tracking-widest">{actionError}</p>}

                        <div className="space-y-6 mb-10">
                            <div className="flex justify-between items-center"><span className="text-xs font-bold text-slate-400">Punch In</span><span className="text-sm font-black text-slate-900">{attendance?.checkInTime || "--:--"}</span></div>
                            <div className="flex justify-between items-center"><span className="text-xs font-bold text-slate-400">Duration</span><span className="text-sm font-black text-indigo-600">{attendance && !attendance.checkOutTime ? formatElapsed() : (attendance?.workMinutes ? `${Math.floor(attendance.workMinutes/60)}h ${attendance.workMinutes%60}m` : "--:--")}</span></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="primary" onClick={onCheckIn} disabled={actionLoading || (!!attendance && !attendance.checkOutTime)} className="w-full">Punch In</Button>
                        <Button variant="secondary" onClick={onCheckOut} disabled={actionLoading || !attendance || !!attendance.checkOutTime} className="w-full border-slate-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 disabled:bg-slate-50 disabled:text-slate-300">Punch Out</Button>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card compact className="group">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Total Days</p>
                    <div className="flex items-end justify-between">
                        <p className="text-4xl font-black text-slate-900">{stats.total}</p>
                        <div className="flex items-end gap-1 h-10">
                            {[4, 7, 5, 8, 6].map((h, i) => (<div key={i} className="w-1.5 bg-indigo-100 rounded-full group-hover:bg-indigo-500 transition-all duration-500" style={{ height: `${h * 10}%` }}></div>))}
                        </div>
                    </div>
                </Card>
                <Card compact className="group">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Present Rate</p>
                    <div className="flex items-center justify-between">
                        <p className="text-4xl font-black text-emerald-600">{stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0}%</p>
                        <div className="relative w-12 h-12">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-50" />
                                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={2 * Math.PI * 20} strokeDashoffset={2 * Math.PI * 20 * (1 - (stats.total > 0 ? stats.present / stats.total : 0))} className="text-emerald-500 transition-all duration-1000" />
                            </svg>
                        </div>
                    </div>
                </Card>
                <Card compact className="group">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Late Arrivals</p>
                    <div className="flex items-end justify-between">
                        <p className="text-4xl font-black text-amber-600">{stats.late}</p>
                        <svg className="w-12 h-8 text-amber-500" viewBox="0 0 100 40" preserveAspectRatio="none"><path d="M0 35 Q 20 35, 40 20 T 80 10 T 100 30" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-10" /><path d="M0 35 Q 20 35, 40 20 T 80 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /><circle cx="80" cy="10" r="4" fill="currentColor" /></svg>
                    </div>
                </Card>
                <Card compact className="group">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Month Hours</p>
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{monthlyHours.progressPercent}%</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Done</p>
                                <p className="text-3xl font-black text-indigo-600">{monthlyHours.completedLabel}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Required</p>
                                <p className="text-lg font-black text-slate-900">{monthlyHours.requiredLabel}</p>
                            </div>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${monthlyHours.progressPercent}%` }}></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <span>{monthlyHours.workingDays} weekdays</span>
                            <span>{monthlyHours.remainingLabel} left</span>
                        </div>
                    </div>
                </Card>
            </div>

            <Card 
                title="Recent Attendance" 
                subtitle="History of your work sessions"
                headerAction={<Link to="/employee/attendance" className="px-6 py-2.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-900 rounded-xl font-bold text-xs transition-all border border-slate-100 active:scale-95">View Full History</Link>}
            >
                <AttendanceViewEmployee data={records} limit={3} loading={recordsLoading} />
            </Card>
        </div>
    );
};

export default EmployeeDashboardPage;
