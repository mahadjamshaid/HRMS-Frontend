import React, { useState } from "react";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { correctAttendance } from "../api/attendance.api";
import { toPKTDateString, getPKTNow } from "../../../utils/dateUtils";
import type { AttendanceCorrectionPayload } from "../../../types/attendanceTypes";

type ManualEntryModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
};

const ManualEntryModal = ({ isOpen, onClose, onSuccess }: ManualEntryModalProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({
        employeeId: "",
        date: toPKTDateString(getPKTNow()),
        checkInTime: "",
        checkOutTime: "",
        adminStatus: "" as "" | "Absent" | "OnLeave",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const payload: AttendanceCorrectionPayload = {
                employeeId: Number(form.employeeId),
                date: form.date, // Already in YYYY-MM-DD from state/input
                adminStatus: form.adminStatus || undefined,
            };

            // Only include times if NOT admin override
            if (!form.adminStatus) {
                if (form.checkInTime) {
                    payload.checkInTime = new Date(form.checkInTime).toISOString();
                }
                if (form.checkOutTime) {
                    payload.checkOutTime = new Date(form.checkOutTime).toISOString();
                }

                // Time consistency check (Frontend Guard)
                if (payload.checkInTime && payload.checkOutTime) {
                    if (new Date(payload.checkOutTime) <= new Date(payload.checkInTime)) {
                        setError("Check-out time must be after check-in time");
                        setLoading(false);
                        return;
                    }
                }
            }

            console.log("MANUAL CORRECTION PAYLOAD:", payload);

            const res = await correctAttendance(payload);

            if (!res.ok) {
                setError(res.error || res.message || "Error recording entry");
                return;
            }

            onSuccess();
            onClose();
            setForm({
                employeeId: "",
                date: toPKTDateString(getPKTNow()),
                checkInTime: "",
                checkOutTime: "",
                adminStatus: "",
            });
        } catch (err) {
            setError("Failed to process request");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Manual Correction">
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-[12px] font-bold text-rose-600 uppercase tracking-tight">
                        {error}
                    </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                    <Input 
                        label="EMPLOYEE ID"
                        type="number" 
                        required
                        value={form.employeeId}
                        onChange={(e) => setForm({...form, employeeId: e.target.value})}
                    />
                    <Input 
                        label="DATE"
                        type="date" 
                        required
                        value={form.date}
                        onChange={(e) => setForm({...form, date: e.target.value})}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                        Status Mode (Administrative)
                    </label>
                    <select
                        value={form.adminStatus}
                        onChange={(e) => setForm({...form, adminStatus: e.target.value as any})}
                        className="w-full py-3.5 px-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-bold text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all appearance-none"
                    >
                        <option value="">Auto (System Policy)</option>
                        <option value="Absent">Force Absent</option>
                        <option value="OnLeave">Force OnLeave</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input 
                        label="CHECK-IN (OPTIONAL)"
                        type="datetime-local" 
                        value={form.checkInTime}
                        onChange={(e) => setForm({...form, checkInTime: e.target.value})}
                        disabled={!!form.adminStatus}
                    />
                    <Input 
                        label="CHECK-OUT (OPTIONAL)"
                        type="datetime-local" 
                        value={form.checkOutTime}
                        onChange={(e) => setForm({...form, checkOutTime: e.target.value})}
                        disabled={!!form.adminStatus}
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <Button 
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit"
                        variant="primary"
                        loading={loading}
                        className="flex-1"
                    >
                        Apply Correction
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default ManualEntryModal;

