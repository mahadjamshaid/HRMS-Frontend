import React, { useState, useEffect } from "react";
import { adminCheckIn, adminCheckOut } from "../../features/attendance/api/attendance.api";
import { useAdminAttendanceRecords } from "../../features/attendance/hooks/useAdminAttendanceRecords";
import AttendanceViewAdmin from "../../features/attendance/components/AttendanceView.admin";
import AttendanceFilters from "../../features/attendance/components/AttendanceFilters";
import ManualEntryModal from "../../features/attendance/components/ManualEntryModal";
import EditAttendanceModal from "../../features/attendance/components/EditAttendanceModal";
import Card from "../../components/Card";
import Button from "../../components/Button";
import type { FormEvent } from "react";
import type {
    AdminCheckInPayload,
    AdminCheckOutPayload,
    AttendanceRecord,
    ManualAttendanceEntry,
} from "../../types/attendanceTypes";

const AttendancePage = () => {
    const { records: allAttendanceRecords, loading: loadingRecords, totalPages, fetchRecords } = useAdminAttendanceRecords();

    const [dateFilter, setDateFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [attendancePage, setAttendancePage] = useState(1);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [manualEntry, setManualEntry] = useState<ManualAttendanceEntry>({
        employeeId: "",
        actionType: "checkIn",
        time: ""
    });

    const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        fetchRecords(attendancePage, 10, dateFilter, statusFilter);
    }, [attendancePage, dateFilter, statusFilter, fetchRecords]);

    const handleManualSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (manualEntry.actionType === "checkIn") {
                const payload: AdminCheckInPayload = { employeeId: Number(manualEntry.employeeId) };
                if (manualEntry.time) payload.checkInTime = new Date(manualEntry.time).toISOString();
                await adminCheckIn(payload);
            } else {
                const payload: AdminCheckOutPayload = { employeeId: Number(manualEntry.employeeId) };
                if (manualEntry.time) payload.checkOutTime = new Date(manualEntry.time).toISOString();
                await adminCheckOut(payload);
            }
            setIsModalOpen(false);
            setManualEntry({ employeeId: "", actionType: "checkIn", time: "" });
            fetchRecords(attendancePage, 10, dateFilter, statusFilter);
        } catch (error) {
            console.error("Failed to manual mark attendance:", error);
            alert("Error marking attendance manually");
        }
    };

    const handleRowClick = (record: AttendanceRecord) => {
        setSelectedRecord(record);
        setIsEditModalOpen(true);
    };

    const handleEditSuccess = () => {
        fetchRecords(attendancePage, 10, dateFilter, statusFilter);
        setIsEditModalOpen(false);
        setSelectedRecord(null);
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-1000">
            <Card 
                title="Attendance Logs"
                subtitle="Comprehensive history of all employee records"
                headerAction={
                    <Button 
                        variant="primary" 
                        onClick={() => setIsModalOpen(true)}
                        icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>}
                    >
                        Manual Check-In/Out
                    </Button>
                }
            >

                <AttendanceFilters 
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    setAttendancePage={setAttendancePage}
                />

                <AttendanceViewAdmin
                    data={allAttendanceRecords}
                    loading={loadingRecords}
                    page={attendancePage}
                    totalPages={totalPages}
                    onPageChange={setAttendancePage}
                    onRowClick={handleRowClick}
                />
            </Card>
            
            <ManualEntryModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                manualEntry={manualEntry}
                setManualEntry={setManualEntry}
                handleManualSubmit={handleManualSubmit}
            />
            <EditAttendanceModal 
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                record={selectedRecord}
                onSuccess={handleEditSuccess}
            />
        </div>
    );
};

export default AttendancePage;
