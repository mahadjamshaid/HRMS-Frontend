import type { Dispatch, FormEventHandler, SetStateAction } from "react";
import type { ApiResponse } from "./api";

export type AttendanceStatus = "Present" | "Late" | "Absent" | "OnLeave";

export type AttendanceRecord = {
  id?: number;
  employeeId?: number;
  employeeName?: string;
  employeeDepartment?: string;
  date: string;
  checkInTime?: string | null;
  checkOutTime?: string | null;
  status: AttendanceStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type AdminAttendanceStats = {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
};

export type AttendanceRecordsPage = {
  records: AttendanceRecord[];
  totalPages: number;
  page?: number;
  limit?: number;
  totalRecords?: number;
};

export type AdminCheckInPayload = {
  employeeId: number;
  checkInTime?: string;
  status?: AttendanceStatus;
};

export type AdminCheckOutPayload = {
  employeeId: number;
  checkOutTime?: string;
};

export type EmployeeCheckInPayload = {
  status?: AttendanceStatus;
};

export type UpdateAttendancePayload = {
  checkInTime?: string;
  checkOutTime?: string;
  status?: Extract<AttendanceStatus, "Absent" | "OnLeave">;
  date?: string;
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
