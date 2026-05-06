import React from "react";
import Input from "../../../components/Input";
import type { ShiftFieldsProps } from "../../../types/departmentTypes";

const ShiftFields = ({ form, onChange, errors = {} }: ShiftFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Input
          label="Start Time"
          type="time"
          name="startTime"
          value={form.startTime}
          onChange={onChange}
          error={errors.startTime}
          required
        />
        <Input
          label="End Time"
          type="time"
          name="endTime"
          value={form.endTime}
          onChange={onChange}
          error={errors.endTime}
          required
        />
        <Input
          label="Grace Minutes"
          type="number"
          min="0"
          max="240"
          name="graceMinutes"
          value={form.graceMinutes}
          onChange={onChange}
          error={errors.graceMinutes}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Required Work Minutes"
          type="number"
          min="240"
          max="960"
          name="requiredWorkMinutes"
          value={form.requiredWorkMinutes}
          onChange={onChange}
          error={errors.requiredWorkMinutes}
          required
        />
        <Input
          label="Checkout Grace Minutes"
          type="number"
          min="0"
          max="60"
          name="checkoutGraceMinutes"
          value={form.checkoutGraceMinutes}
          onChange={onChange}
          error={errors.checkoutGraceMinutes}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
        <Input
          label="Break Minutes"
          type="number"
          min="0"
          max="120"
          name="breakMinutes"
          value={form.breakMinutes}
          onChange={onChange}
          error={errors.breakMinutes}
          required
        />
      </div>
    </>
  );
};

export default ShiftFields;
