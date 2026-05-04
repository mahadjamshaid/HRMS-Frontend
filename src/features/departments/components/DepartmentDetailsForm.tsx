import React, { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import type { ChangeEvent, FormEvent } from "react";
import type { DepartmentDetailsFormProps } from "../../../types/departmentTypes";

const DepartmentDetailsForm = ({
  department,
  onSubmit,
  saving = false,
  disabled = false,
}: DepartmentDetailsFormProps) => {
  const [form, setForm] = useState({
    name: department?.name || "",
    description: department?.description || "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({
      name: form.name,
      description: form.description,
    });
  };

  return (
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

      <div className="flex justify-end">
        <Button type="submit" loading={saving} disabled={disabled}>
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default DepartmentDetailsForm;
