import React, { useMemo, useState } from "react";
import Button from "../../../components/Button";
import {
  analyzeShiftForm,
  emptyShiftForm,
  toAssignDepartmentShiftPayload,
} from "../utils/departmentShift.utils";
import ShiftFields from "./ShiftFields";
import type { ChangeEvent, FormEvent } from "react";
import type { ShiftFormProps } from "../../../types/departmentTypes";

const ShiftForm = ({
  initialForm = emptyShiftForm,
  onSubmit,
  submitLabel = "Save Shift",
  disabled = false,
  saving = false,
}: ShiftFormProps) => {
  const [form, setForm] = useState(initialForm);
  const [localError, setLocalError] = useState("");
  const analysis = useMemo(() => analyzeShiftForm(form), [form]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setLocalError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!analysis.valid) {
      setLocalError(Object.values(analysis.errors)[0] || "Invalid shift timing");
      return;
    }

    await onSubmit(toAssignDepartmentShiftPayload(form));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {localError && (
        <p className="text-sm font-black text-rose-500">{localError}</p>
      )}
      <ShiftFields form={form} onChange={handleChange} errors={analysis.errors} />
      <div className="flex justify-end">
        <Button type="submit" loading={saving} disabled={disabled || !analysis.valid}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default ShiftForm;
