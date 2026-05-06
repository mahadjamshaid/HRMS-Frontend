import type { Dispatch, FormEventHandler, SetStateAction } from "react";
import type { ApiResponse } from "./api";

export type AttendanceStatus = "Present" | "Late" | "HalfDay" | "ShortDay" | "Absent" | "OnLeave";

export type AttendanceRecord = {
  id?: number;
  employeeId: number;
  employeeName?: string;
  employeeDepartment?: number;
  attendanceDate: string;
  date?: string; // Legacy
  // Phase 4: Strictly strings from backend (Formatted PKT)
  checkInTime: string | null;
  checkOutTime: string | null;
  // Phase 6: Raw ISO strings for Edit Modal
  checkInTimeRaw?: string | null;
  checkOutTimeRaw?: string | null;
  status: string;
  workMinutes: number | null;
  adminStatus?: string | null;
  requiredWorkMinutes?: number | null;
  checkoutGraceMinutes?: number | null;
};

export type AdminAttendanceSummary = {
  total: number;
  present: number;
  absent: number;
  late: number;
  halfDay: number;
  shortDay: number;
};

export type AttendanceRecordsPage = {
  records: AttendanceRecord[];
  totalPages: number;
  page?: number;
  limit?: number;
  totalRecords?: number;
};

export type AttendanceCorrectionPayload = {
  employeeId: number;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  adminStatus?: "Absent" | "OnLeave";
  reason?: string;
};

export type EmployeeCheckInPayload = {
  status?: AttendanceStatus;
};

export type UpdateAttendanceResult = {
  success: boolean;
  data: AttendanceRecord | null;
  error: string | null;
};

export type AttendanceViewEmployeeProps = {
  data: AttendanceRecord[];
  loading: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  limit?: number;
};

export type WorkHoursWidgetProps = {
  checkInTime?: string | null;
  checkOutTime?: string | null;
  checkInTimeRaw?: string | null;
  checkOutTimeRaw?: string | null;
  workMinutes?: number | null;
  requiredWorkMinutes?: number | null;
};

export type ManualAttendanceAction = "checkIn" | "checkOut";

export type ManualAttendanceEntry = {
  employeeId: string;
  actionType: ManualAttendanceAction;
  time: string;
};

export type ManualEntryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  manualEntry: ManualAttendanceEntry;
  setManualEntry: Dispatch<SetStateAction<ManualAttendanceEntry>>;
  handleManualSubmit: FormEventHandler<HTMLFormElement>;
};

export type EditAttendanceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  record: AttendanceRecord | null;
  onSuccess: () => void;
};

export type AttendanceApiResponse<T> = ApiResponse<T>;
