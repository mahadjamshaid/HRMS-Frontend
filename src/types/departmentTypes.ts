import type { ChangeEvent } from "react";

export type DepartmentShift = {
  id: number;
  startTime: string;
  endTime: string;
  graceMinutes: number;
  breakStartTime?: string | null;
  breakEndTime?: string | null;
  durationMinutes?: number;
  isOvernight?: boolean;
};

export type Department = {
  id: number;
  name: string;
  description: string | null;
  shiftId: number | null;
  createdAt: string;
  updatedAt: string;
  assignedShift: DepartmentShift | null;
};

export type CreateDepartmentPayload = {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  graceMinutes: number;
  breakStartTime?: string;
  breakEndTime?: string;
};

export type UpdateDepartmentPayload = {
  name?: string;
  description?: string;
};

export type AssignDepartmentShiftPayload = {
  startTime: string;
  endTime: string;
  graceMinutes: number;
  breakStartTime?: string;
  breakEndTime?: string;
};

export type ShiftFormValues = {
  startTime: string;
  endTime: string;
  graceMinutes: string;
  breakStartTime: string;
  breakEndTime: string;
};

export type CreateDepartmentFormValues = ShiftFormValues & {
  name: string;
  description: string;
};

export type ShiftValidationErrors = Partial<Record<keyof ShiftFormValues, string>>;

export type ShiftAnalysis = {
  valid: boolean;
  errors: ShiftValidationErrors;
  isOvernight: boolean;
  durationMinutes: number;
};

export type DepartmentDetailsFormProps = {
  department?: Department | null;
  onSubmit: (data: UpdateDepartmentPayload) => Promise<void>;
  saving?: boolean;
  disabled?: boolean;
};

export type DepartmentSelectProps = {
  departments: Department[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export type DepartmentTableProps = {
  departments: Department[];
  loading: boolean;
};

export type FeedbackBannerProps = {
  message?: string;
  error?: string;
};

export type ShiftFieldsProps = {
  form: ShiftFormValues;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errors?: ShiftValidationErrors;
};

export type ShiftFormProps = {
  initialForm?: ShiftFormValues;
  onSubmit: (payload: AssignDepartmentShiftPayload) => Promise<void>;
  submitLabel?: string;
  disabled?: boolean;
  saving?: boolean;
};

export type ShiftPreviewProps = {
  form: ShiftFormValues;
  title?: string;
};
