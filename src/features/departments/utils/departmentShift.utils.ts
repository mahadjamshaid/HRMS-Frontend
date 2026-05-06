import type { ApiResponse } from "../../../types/api";
import type {
  AssignDepartmentShiftPayload,
  CreateDepartmentFormValues,
  CreateDepartmentPayload,
  Department,
  ShiftAnalysis,
  ShiftFormValues,
  ShiftValidationErrors,
} from "../../../types/departmentTypes";

export const emptyShiftForm: ShiftFormValues = {
  startTime: "09:00",
  endTime: "17:00",
  graceMinutes: "15",
  breakMinutes: "30",
  requiredWorkMinutes: "480",
  checkoutGraceMinutes: "15",
};

export const toTimeInput = (value?: string | null): string => {
  if (!value) return "";
  return String(value).slice(0, 5);
};

export const formatShiftTime = (value?: string | null): string => {
  if (!value) return "--:--";
  const [hours = "00", minutes = "00"] = String(value).split(":");
  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
};

export const timeToMinutes = (value: string): number => {
  const [hours, minutes] = String(value).split(":").map(Number);
  return hours * 60 + minutes;
};

const normalizePointInsideShift = (pointMinutes: number, shiftStartMinutes: number, isOvernight: boolean): number => {
  if (isOvernight && pointMinutes < shiftStartMinutes) {
    return pointMinutes + 1440;
  }

  return pointMinutes;
};

const parseGraceMinutes = (value: string): number | null => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return null;

  const graceMinutes = Number(trimmedValue);
  if (!Number.isFinite(graceMinutes) || !Number.isInteger(graceMinutes)) {
    return null;
  }

  return graceMinutes;
};

const getValidGraceMinutes = (value: string): number => {
  const graceMinutes = parseGraceMinutes(value);

  if (graceMinutes === null || graceMinutes < 0 || graceMinutes > 240) {
    throw new Error("Grace minutes must be a whole number between 0 and 240");
  }

  return graceMinutes;
};

export const analyzeShiftForm = (form: ShiftFormValues): ShiftAnalysis => {
  const errors: ShiftValidationErrors = {};

  if (!form.startTime) errors.startTime = "Start time is required";
  if (!form.endTime) errors.endTime = "End time is required";

  const graceMinutes = parseGraceMinutes(form.graceMinutes);
  if (graceMinutes === null) {
    errors.graceMinutes = form.graceMinutes.trim()
      ? "Grace minutes must be a valid whole number"
      : "Grace minutes is required";
  } else if (graceMinutes < 0 || graceMinutes > 240) {
    errors.graceMinutes = "Grace minutes must be between 0 and 240";
  }

  if (errors.startTime || errors.endTime) {
    return { valid: false, errors, isOvernight: false, durationMinutes: 0 };
  }

  const startMinutes = timeToMinutes(form.startTime);
  const endMinutes = timeToMinutes(form.endTime);
  const isOvernight = endMinutes < startMinutes;
  const normalizedEndMinutes = isOvernight ? endMinutes + 1440 : endMinutes;
  const durationMinutes = normalizedEndMinutes - startMinutes;

  if (startMinutes === endMinutes) {
    errors.endTime = "End time must be different from start time";
  } else if (durationMinutes < 30) {
    errors.endTime = "Shift duration must be at least 30 minutes";
  } else if (durationMinutes > 16 * 60) {
    errors.endTime = "Shift duration cannot exceed 16 hours";
  }

  const breakMinutes = parseGraceMinutes(form.breakMinutes); // reuse same parser
  if (breakMinutes === null) {
    errors.breakMinutes = form.breakMinutes.trim()
      ? "Break minutes must be a valid whole number"
      : "Break minutes is required";
  } else if (breakMinutes < 0 || breakMinutes > 120) {
    errors.breakMinutes = "Break minutes must be between 0 and 120";
  }

  const requiredWorkMinutes = parseGraceMinutes(form.requiredWorkMinutes);
  if (requiredWorkMinutes === null) {
    errors.requiredWorkMinutes = form.requiredWorkMinutes.trim()
      ? "Required work minutes must be a valid whole number"
      : "Required work minutes is required";
  } else if (requiredWorkMinutes < 240 || requiredWorkMinutes > 960) {
    errors.requiredWorkMinutes = "Required work minutes must be between 240 and 960";
  }

  const checkoutGraceMinutes = parseGraceMinutes(form.checkoutGraceMinutes);
  if (checkoutGraceMinutes === null) {
    errors.checkoutGraceMinutes = form.checkoutGraceMinutes.trim()
      ? "Checkout grace minutes must be a valid whole number"
      : "Checkout grace minutes is required";
  } else if (checkoutGraceMinutes < 0 || checkoutGraceMinutes > 60) {
    errors.checkoutGraceMinutes = "Checkout grace minutes must be between 0 and 60";
  }


  return {
    valid: Object.keys(errors).length === 0,
    errors,
    isOvernight,
    durationMinutes,
  };
};

export const formatDuration = (durationMinutes: number): string => {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  if (!hours) return `${minutes}m`;
  if (!minutes) return `${hours}h`;
  return `${hours}h ${minutes}m`;
};

export const toAssignDepartmentShiftPayload = (form: ShiftFormValues): AssignDepartmentShiftPayload => ({
  startTime: form.startTime,
  endTime: form.endTime,
  graceMinutes: getValidGraceMinutes(form.graceMinutes),
  breakMinutes: Number(form.breakMinutes) || 0,
  requiredWorkMinutes: Number(form.requiredWorkMinutes) || 480,
  checkoutGraceMinutes: Number(form.checkoutGraceMinutes) || 15,
});

export const toCreateDepartmentPayload = (form: CreateDepartmentFormValues): CreateDepartmentPayload => ({
  name: form.name,
  description: form.description,
  startTime: form.startTime,
  endTime: form.endTime,
  graceMinutes: getValidGraceMinutes(form.graceMinutes),
  breakMinutes: Number(form.breakMinutes) || 0,
  requiredWorkMinutes: Number(form.requiredWorkMinutes) || 480,
  checkoutGraceMinutes: Number(form.checkoutGraceMinutes) || 15,
});

export const getShiftFormFromDepartment = (department?: Department | null): ShiftFormValues => ({
  startTime: toTimeInput(department?.assignedShift?.startTime) || emptyShiftForm.startTime,
  endTime: toTimeInput(department?.assignedShift?.endTime) || emptyShiftForm.endTime,
  graceMinutes: String(department?.assignedShift?.graceMinutes ?? emptyShiftForm.graceMinutes),
  breakMinutes: String(department?.assignedShift?.breakMinutes ?? emptyShiftForm.breakMinutes),
  requiredWorkMinutes: String(department?.assignedShift?.requiredWorkMinutes ?? emptyShiftForm.requiredWorkMinutes),
  checkoutGraceMinutes: String(department?.assignedShift?.checkoutGraceMinutes ?? emptyShiftForm.checkoutGraceMinutes),
});

export const getApiMessage = (response: ApiResponse<unknown> | undefined, fallback: string): string => {
  return response?.message || response?.error || fallback;
};
