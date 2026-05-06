import { useMemo } from "react";
import { formatMinutes } from "../../../utils/dateUtils";
import type { AttendanceRecord } from "../../../types/attendanceTypes";

const DEFAULT_REQUIRED_WORK_MINUTES = 8 * 60;

type MonthlyHoursStats = {
  completedMinutes: number;
  requiredMinutes: number;
  remainingMinutes: number;
  workingDays: number;
  progressPercent: number;
  completedLabel: string;
  requiredLabel: string;
  remainingLabel: string;
};

const getCurrentPKTMonth = () => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "numeric",
  }).formatToParts(new Date());

  return {
    year: Number(parts.find((part) => part.type === "year")?.value),
    month: Number(parts.find((part) => part.type === "month")?.value),
  };
};

const isWeekday = (year: number, month: number, day: number): boolean => {
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return weekday !== 0 && weekday !== 6;
};

const getWorkingDaysInMonth = (year: number, month: number): number => {
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  let workingDays = 0;

  for (let day = 1; day <= daysInMonth; day += 1) {
    if (isWeekday(year, month, day)) workingDays += 1;
  }

  return workingDays;
};

const isCurrentPKTMonthRecord = (record: AttendanceRecord, year: number, month: number): boolean => {
  const [recordYear, recordMonth] = record.attendanceDate.split("-").map(Number);
  return recordYear === year && recordMonth === month;
};

export const useEmployeeMonthlyHours = (
  records: AttendanceRecord[],
  activeAttendance: AttendanceRecord | null,
  activeElapsedMinutes: number
): MonthlyHoursStats => {
  return useMemo(() => {
    const { year, month } = getCurrentPKTMonth();
    const currentMonthRecords = records.filter((record) => isCurrentPKTMonthRecord(record, year, month));
    const dailyRequiredMinutes =
      currentMonthRecords.find((record) => typeof record.requiredWorkMinutes === "number")?.requiredWorkMinutes ??
      (typeof activeAttendance?.requiredWorkMinutes === "number" ? activeAttendance.requiredWorkMinutes : undefined) ??
      records.find((record) => typeof record.requiredWorkMinutes === "number")?.requiredWorkMinutes ??
      DEFAULT_REQUIRED_WORK_MINUTES;

    const completedFromRecords = currentMonthRecords.reduce((total, record) => {
      return total + (record.workMinutes ?? 0);
    }, 0);

    const activeMinutes =
      activeAttendance &&
      !activeAttendance.checkOutTime &&
      isCurrentPKTMonthRecord(activeAttendance, year, month)
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
      completedLabel: formatMinutes(completedMinutes),
      requiredLabel: formatMinutes(requiredMinutes),
      remainingLabel: formatMinutes(remainingMinutes),
    };
  }, [activeAttendance, activeElapsedMinutes, records]);
};
