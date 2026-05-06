import { useMemo } from "react";
import { formatMinutes } from "../../../utils/dateUtils";
import type { AttendanceRecord } from "../../../types/attendanceTypes";

const DEFAULT_REQUIRED_WORK_MINUTES = 480;

type MonthlyHoursStats = {
  completedMinutes: number;
  requiredMinutes: number;
  remainingMinutes: number;
  workingDays: number;
  progressPercent: number;
  completedHoursLabel: string;
  requiredHoursLabel: string;
  completedLabel: string;
  requiredLabel: string;
  remainingLabel: string;
};

const getWorkingDaysInMonth = (year: number, month: number): number => {
  let workingDays = 0;
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    const day = date.getDay();
    if (day !== 0 && day !== 6) workingDays += 1;
    date.setDate(date.getDate() + 1);
  }

  return workingDays;
};

const isCurrentMonthRecord = (record: AttendanceRecord, year: number, month: number): boolean => {
  const date = new Date(record.attendanceDate);
  return date.getMonth() === month && date.getFullYear() === year;
};

const isValidRequiredMinutes = (value: number | null | undefined): value is number => {
  return typeof value === "number" && value > 0;
};

export const useEmployeeMonthlyHours = (
  records: AttendanceRecord[],
  activeAttendance: AttendanceRecord | null,
  activeElapsedMinutes: number
): MonthlyHoursStats => {
  return useMemo(() => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const currentMonthRecords = records.filter((record) => isCurrentMonthRecord(record, year, month));
    const dailyRequiredMinutes =
      currentMonthRecords.find((record) => isValidRequiredMinutes(record.requiredWorkMinutes))?.requiredWorkMinutes ??
      (isValidRequiredMinutes(activeAttendance?.requiredWorkMinutes) ? activeAttendance.requiredWorkMinutes : undefined) ??
      records.find((record) => isValidRequiredMinutes(record.requiredWorkMinutes))?.requiredWorkMinutes ??
      DEFAULT_REQUIRED_WORK_MINUTES;

    const completedFromRecords = currentMonthRecords.reduce((total, record) => {
      return total + (record.workMinutes ?? 0);
    }, 0);

    const activeMinutes =
      activeAttendance &&
      !activeAttendance.checkOutTime &&
      isCurrentMonthRecord(activeAttendance, year, month)
        ? activeElapsedMinutes
        : 0;

    const workingDays = getWorkingDaysInMonth(year, month);
    const requiredMinutes = workingDays * dailyRequiredMinutes;
    const completedMinutes = completedFromRecords + activeMinutes;
    const remainingMinutes = Math.max(0, requiredMinutes - completedMinutes);
    const progressPercent = requiredMinutes > 0
      ? Math.min(100, Math.round((completedMinutes / requiredMinutes) * 100))
      : 0;

    return {
      completedMinutes,
      requiredMinutes,
      remainingMinutes,
      workingDays,
      progressPercent,
      completedHoursLabel: `${Math.floor(completedMinutes / 60)}h`,
      requiredHoursLabel: `${Math.floor(requiredMinutes / 60)}h`,
      completedLabel: formatMinutes(completedMinutes),
      requiredLabel: formatMinutes(requiredMinutes),
      remainingLabel: formatMinutes(remainingMinutes),
    };
  }, [activeAttendance, activeElapsedMinutes, records]);
};
