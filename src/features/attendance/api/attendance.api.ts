import { attendanceService } from "./attendance.service";
import type {
  AdminAttendanceSummary,
  AttendanceApiResponse,
  AttendanceCorrectionPayload,
  AttendanceRecord,
  AttendanceRecordsPage,
  EmployeeCheckInPayload,
} from "../../../types/attendanceTypes";

/**
 * ADMIN ATTENDANCE METHODS
 */
export const correctAttendance = async (data: AttendanceCorrectionPayload): Promise<AttendanceApiResponse<AttendanceRecord>> => {
  return attendanceService.post<AttendanceRecord, AttendanceCorrectionPayload>("/attendance/correct", data);
};

export const getAttendanceSummary = async (): Promise<AttendanceApiResponse<AdminAttendanceSummary>> => {
  return attendanceService.get<AdminAttendanceSummary>("/attendance/reports/summary");
};

export const getEmployeeHistoryForAdmin = async (
  employeeId: number, 
  startDate?: string, 
  endDate?: string
): Promise<AttendanceApiResponse<AttendanceRecord[]>> => {
  let url = `/attendance/reports/employee/${employeeId}`;
  if (startDate && endDate) url += `?startDate=${startDate}&endDate=${endDate}`;
  return attendanceService.get<AttendanceRecord[]>(url);
};

export const getDepartmentAttendance = async (
  departmentId: number,
  date?: string
): Promise<AttendanceApiResponse<AttendanceRecord[]>> => {
  let url = `/attendance/reports/department/${departmentId}`;
  if (date) url += `?date=${date}`;
  return attendanceService.get<AttendanceRecord[]>(url);
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


/**
 * EMPLOYEE ATTENDANCE METHODS
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
