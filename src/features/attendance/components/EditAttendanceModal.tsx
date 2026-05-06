import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useCorrectAttendance } from "../hooks/useCorrectAttendance";
import { formatForDateTimeLocal, toPKTDateString } from "../../../utils/dateUtils";
import type { ChangeEvent, FormEvent } from "react";
import type { AttendanceCorrectionPayload, EditAttendanceModalProps } from "../../../types/attendanceTypes";

type EditAttendanceForm = {
  checkInTime: string;
  checkOutTime: string;
  adminStatus: "" | "Absent" | "OnLeave";
};

const EditAttendanceModal = ({
  isOpen,
  onClose,
  record,
  onSuccess,
}: EditAttendanceModalProps) => {
  const { correct, loading, error } = useCorrectAttendance();
  const [localError, setLocalError] = useState<string | null>(null);
  const [form, setForm] = useState<EditAttendanceForm>({
    checkInTime: "",
    checkOutTime: "",
    adminStatus: "",
  });

  useEffect(() => {
    if (!record) return;

    const timer = setTimeout(() => {
      setForm({
        checkInTime: formatForDateTimeLocal(record.checkInTime),
        checkOutTime: formatForDateTimeLocal(record.checkOutTime),
        adminStatus: (record.status === "Absent" || record.status === "OnLeave") ? record.status : "",
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
          adminStatus: "",
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

    if (!record?.employeeId || !record?.attendanceDate) {
      setLocalError("Missing employee or date context");
      return;
    }

    const formattedDate = toPKTDateString(record.attendanceDate);

    const payload: AttendanceCorrectionPayload = {
      employeeId: record.employeeId,
      date: formattedDate,
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
    }

    console.log("CORRECTION PAYLOAD:", payload);

    const res = await correct(payload);

    if (res?.success) {
      onSuccess();
      onClose();
    } else {
      setLocalError(res?.error || "Correction failed");
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
            disabled={form.adminStatus === "Absent"}
          />

          <Input
            label="Check-out Time"
            type="datetime-local"
            name="checkOutTime"
            value={form.checkOutTime}
            onChange={handleChange}
            disabled={form.adminStatus === "Absent"}
          />

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                Status Mode (Administrative Override)
            </label>
            <select
              name="adminStatus"
              value={form.adminStatus}
              onChange={handleChange}
              className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none appearance-none"
            >
              <option value="">Auto (System Policy)</option>
              <option value="Absent">Force Absent</option>
              <option value="OnLeave">Force OnLeave</option>
            </select>
            <p className="text-[10px] font-bold text-slate-400 px-1">
                Overrides will bypass automated policy rules.
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
