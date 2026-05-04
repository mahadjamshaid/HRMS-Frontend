export type AttendanceFiltersProps = {
  dateFilter: string;
  setDateFilter: (value: string) => void;

  statusFilter: string;
  setStatusFilter: (value: string) => void;

  setAttendancePage: (page: number) => void;
};