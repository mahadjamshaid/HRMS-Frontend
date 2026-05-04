import React, { useMemo, useState } from "react";
import Card from "../../../components/Card";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import FeedbackBanner from "../../../features/departments/components/FeedbackBanner";
import ShiftFields from "../../../features/departments/components/ShiftFields";
import ShiftPreview from "../../../features/departments/components/ShiftPreview";
import { useDepartmentMutations } from "../../../features/departments/hooks/useDepartmentMutations";
import {
  analyzeShiftForm,
  emptyShiftForm,
  toCreateDepartmentPayload,
} from "../../../features/departments/utils/departmentShift.utils";
import type { ChangeEvent, FormEvent } from "react";
import type { CreateDepartmentFormValues } from "../../../types/departmentTypes";

const initialForm: CreateDepartmentFormValues = {
  name: "",
  description: "",
  ...emptyShiftForm,
};

const CreateDepartmentPage = () => {
  const [form, setForm] = useState(initialForm);
  const {
    saving,
    message,
    error,
    setError,
    clearFeedback,
    createDepartmentRecord,
  } = useDepartmentMutations();
  const shiftAnalysis = useMemo(() => analyzeShiftForm(form), [form]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearFeedback();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!shiftAnalysis.valid) {
      setError(Object.values(shiftAnalysis.errors)[0] || "Invalid shift timing");
      return;
    }

    const result = await createDepartmentRecord(toCreateDepartmentPayload(form));

    if (result.success) {
      setForm(initialForm);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-8 animate-in fade-in duration-700">
      <Card title="Create Department" subtitle="Set department details and required shift timing">
        <FeedbackBanner message={message} error={error} />

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Department Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <ShiftFields form={form} onChange={handleChange} errors={shiftAnalysis.errors} />

          <div className="flex justify-end">
            <Button type="submit" loading={saving} disabled={!shiftAnalysis.valid}>
              Create Department
            </Button>
          </div>
        </form>
      </Card>

      <Card title="Shift Setup" subtitle="Preview" compact>
        <ShiftPreview form={form} />
      </Card>
    </div>
  );
};

export default CreateDepartmentPage;
