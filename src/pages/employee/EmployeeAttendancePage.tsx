import React, { useEffect } from "react";
import { useEmployeeAttendanceRecords } from "../../features/attendance/hooks/useEmployeeAttendanceRecords";
import AttendanceViewEmployee from "../../features/attendance/components/AttendanceView.employee";
import Card from "../../components/Card";
import Button from "../../components/Button";

const EmployeeAttendancePage = () => {
    const { records, loading, error, fetchRecords } = useEmployeeAttendanceRecords();

    useEffect(() => {
        fetchRecords();
    }, [fetchRecords]);

    return (
        <div className="space-y-10 animate-in fade-in duration-1000">
            <Card 
                title="Attendance Logs" 
                subtitle="Comprehensive history of your attendance records"
                headerAction={
                    <Button variant="primary" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}>
                        Export PDF
                    </Button>
                }
            >
                {error && (
                    <div className="bg-rose-50/50 backdrop-blur-sm border border-rose-100 text-rose-600 p-6 rounded-[2rem] text-sm font-bold flex items-center gap-4 mb-6">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {error}
                    </div>
                )}
                <AttendanceViewEmployee data={records} loading={loading} />
            </Card>
        </div>
    );
};

export default EmployeeAttendancePage;
