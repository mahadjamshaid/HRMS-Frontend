import React from "react";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import type { ManualAttendanceAction, ManualEntryModalProps } from "../../../types/attendanceTypes";

const ManualEntryModal = ({ isOpen, onClose, manualEntry, setManualEntry, handleManualSubmit }: ManualEntryModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Manual Entry">
            <form onSubmit={handleManualSubmit} className="space-y-4">
                <Input 
                    label="EMPLOYEE ID"
                    type="number" 
                    required
                    value={manualEntry.employeeId}
                    onChange={(e) => setManualEntry({...manualEntry, employeeId: e.target.value})}
                />
                <div className="space-y-2">
                    <label className="text-[13px] font-bold text-slate-700 block ml-1 uppercase tracking-widest">ACTION</label>
                    <select 
                        value={manualEntry.actionType}
                        onChange={(e) => setManualEntry({...manualEntry, actionType: e.target.value as ManualAttendanceAction})}
                        className="w-full py-3.5 px-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all"
                    >
                        <option value="checkIn">Check In</option>
                        <option value="checkOut">Check Out</option>
                    </select>
                </div>
                <Input 
                    label="TIME (OPTIONAL)"
                    type="datetime-local" 
                    value={manualEntry.time}
                    onChange={(e) => setManualEntry({...manualEntry, time: e.target.value})}
                />
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
                        className="flex-1"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default ManualEntryModal;
