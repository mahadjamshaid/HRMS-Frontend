import type { AttendanceRecord } from "./attendanceTypes";

export type { AttendanceRecord };

export type AttendanceViewAdminProps = {
  data: AttendanceRecord[];
  loading: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onRowClick?: (row: AttendanceRecord) => void;
};
