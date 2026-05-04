import { attendanceService } from "./attendance.service";
import type {
  AdminAttendanceStats,
  AdminCheckInPayload,
  AdminCheckOutPayload,
  AttendanceApiResponse,
  AttendanceRecord,
  AttendanceRecordsPage,
  EmployeeCheckInPayload,
  UpdateAttendancePayload,
} from "../../../types/attendanceTypes";

/**
 * ADMIN ATTENDANCE METHODS
 * Requires administrative permissions on the backend
 */
export const adminCheckIn = async (data: AdminCheckInPayload): Promise<AttendanceApiResponse<AttendanceRecord>> => {
  return attendanceService.post<AttendanceRecord, AdminCheckInPayload>("/attendance/check-in", data);
};

export const adminCheckOut = async (data: AdminCheckOutPayload): Promise<AttendanceApiResponse<AttendanceRecord>> => {
  return attendanceService.post<AttendanceRecord, AdminCheckOutPayload>("/attendance/check-out", data);
};

export const getAdminStats = async (): Promise<AttendanceApiResponse<AdminAttendanceStats>> => {
  return attendanceService.get<AdminAttendanceStats>("/attendance/admin/stats");
};

export const getAttendanceByEmployeeId = async (employeeId: number): Promise<AttendanceApiResponse<AttendanceRecord[]>> => {
  return attendanceService.get<AttendanceRecord[]>(`/attendance/${employeeId}`);
};

export const getAllAttendance = async (
  page = 1,
  limit = 10,
  date?: string,
  status?: string
): Promise<AttendanceApiResponse<AttendanceRecordsPage>> => {
  let url = `/attendance?page=${page}&limit=${limit}`;
  if (date) url += `&date=${date}`;
  if (status) url += `&status=${status}`;

  return attendanceService.get<AttendanceRecordsPage>(url);
};

export const updateAttendance = async (
  id: number,
  data: UpdateAttendancePayload
): Promise<AttendanceApiResponse<AttendanceRecord>> => {
  return attendanceService.put<AttendanceRecord, UpdateAttendancePayload>(`/attendance/${id}`, data);
};

/**
 * EMPLOYEE ATTENDANCE METHODS
 * Self-service methods for the currently authenticated user
 */
export const employeeCheckIn = async (data?: EmployeeCheckInPayload): Promise<AttendanceApiResponse<AttendanceRecord>> => {
  return attendanceService.post<AttendanceRecord, EmployeeCheckInPayload>("/attendance/employee/check-in", data);
};

export const employeeCheckOut = async (): Promise<AttendanceApiResponse<AttendanceRecord>> => {
  return attendanceService.post<AttendanceRecord>("/attendance/employee/check-out");
};

export const getTodayAttendance = async (): Promise<AttendanceApiResponse<AttendanceRecord | null>> => {
  return attendanceService.get<AttendanceRecord | null>("/attendance/employee/today");
};

export const getMyRecords = async (): Promise<AttendanceApiResponse<AttendanceRecord[]>> => {
  return attendanceService.get<AttendanceRecord[]>("/attendance/employee/my-records");
};
