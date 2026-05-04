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
          label="Break Start"
          type="time"
          name="breakStartTime"
          value={form.breakStartTime}
          onChange={onChange}
          error={errors.breakStartTime}
        />
        <Input
          label="Break End"
          type="time"
          name="breakEndTime"
          value={form.breakEndTime}
          onChange={onChange}
          error={errors.breakEndTime}
        />
      </div>
    </>
  );
};

export default ShiftFields;
