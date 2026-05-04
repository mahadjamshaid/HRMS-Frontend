import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useUpdateAttendance } from "../hooks/useUpdateAttendance";
import { formatForDateTimeLocal } from "../../../utils/dateUtils";
import type { ChangeEvent, FormEvent } from "react";
import type { AttendanceStatus, EditAttendanceModalProps, UpdateAttendancePayload } from "../../../types/attendanceTypes";

type EditAttendanceForm = {
  checkInTime: string;
  checkOutTime: string;
  status: "" | AttendanceStatus;
};

const isManualAttendanceStatus = (status: EditAttendanceForm["status"]): status is NonNullable<UpdateAttendancePayload["status"]> => {
  return status === "Absent" || status === "OnLeave";
};

const EditAttendanceModal = ({
  isOpen,
  onClose,
  record,
  onSuccess,
}: EditAttendanceModalProps) => {
  const { update, loading, error } = useUpdateAttendance();
  const [localError, setLocalError] = useState<string | null>(null);
  const [form, setForm] = useState<EditAttendanceForm>({
    checkInTime: "",
    checkOutTime: "",
    status: "",
  });

  useEffect(() => {
    if (!record) return;

    const timer = setTimeout(() => {
      setForm({
        checkInTime: formatForDateTimeLocal(record.checkInTime),
        checkOutTime: formatForDateTimeLocal(record.checkOutTime),
        status: record.status || "",
      });
      setLocalError(null);
    }, 0);

    return () => clearTimeout(timer);
  }, [record]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setForm({
          checkInTime: "",
          checkOutTime: "",
          status: "",
        });
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clean the payload: only send fields that are present
    const payload: UpdateAttendancePayload = {};
    
    if (form.checkInTime) {
      payload.checkInTime = new Date(form.checkInTime).toISOString();
    }
    
    if (form.checkOutTime) {
      payload.checkOutTime = new Date(form.checkOutTime).toISOString();
    }
    
    if (isManualAttendanceStatus(form.status)) {
      payload.status = form.status;
    }

    if (!record?.id) {
    setLocalError("Cannot edit absent record. Please check-in first.");
    return;
    }

    const res = await update(record.id, payload);

    if (res?.success) {
    onSuccess();
    onClose();
  } else {
    setLocalError(res?.error || "Update failed");
  }
};

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Attendance"
      subtitle={`Correcting record for ${record?.employeeName || 'Employee'}`}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {(localError || error) && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
            <p className="text-sm font-bold text-red-600">
              {localError || error}</p>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Check-in Time"
            type="datetime-local"
            name="checkInTime"
            value={form.checkInTime}
            onChange={handleChange}
            disabled={form.status === "Absent"}
          />

          <Input
            label="Check-out Time"
            type="datetime-local"
            name="checkOutTime"
            value={form.checkOutTime}
            onChange={handleChange}
            disabled={form.status === "Absent"}
          />

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                Status Mode
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none appearance-none"
            >
              <option value="">Auto (Present/Late)</option>
              <option value="Absent">Absent</option>
              <option value="OnLeave">OnLeave</option>
            </select>
            <p className="text-[10px] font-bold text-slate-400 px-1">
                Selecting "Absent" will wipe all check-in/out times.
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
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
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditAttendanceModal;
