import React, { useMemo, useState } from "react";
import Card from "../../../components/Card";
import DepartmentSelect from "../../../features/departments/components/DepartmentSelect";
import FeedbackBanner from "../../../features/departments/components/FeedbackBanner";
import ShiftForm from "../../../features/departments/components/ShiftForm";
import ShiftPreview from "../../../features/departments/components/ShiftPreview";
import { useDepartmentMutations } from "../../../features/departments/hooks/useDepartmentMutations";
import { useDepartments } from "../../../features/departments/hooks/useDepartments";
import { getShiftFormFromDepartment } from "../../../features/departments/utils/departmentShift.utils";
import type { AssignDepartmentShiftPayload } from "../../../types/departmentTypes";

const AssignShiftPage = () => {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const { departments, loading, error: loadError, fetchDepartments } = useDepartments();
  const {
    saving,
    message,
    error: saveError,
    assignShiftRecord,
  } = useDepartmentMutations();

  const effectiveDepartmentId = selectedDepartmentId || String(departments[0]?.id || "");
  const selectedDepartment = useMemo(
    () => departments.find((department) => String(department.id) === String(effectiveDepartmentId)),
    [departments, effectiveDepartmentId]
  );
  const shiftForm = useMemo(
    () => getShiftFormFromDepartment(selectedDepartment),
    [selectedDepartment]
  );

  const handleSubmit = async (payload: AssignDepartmentShiftPayload) => {
    if (!effectiveDepartmentId) return;

    const result = await assignShiftRecord(effectiveDepartmentId, payload);
    if (result.success) {
      await fetchDepartments();
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-8 animate-in fade-in duration-700">
      <Card title="Assign Shift" subtitle="Update shift timing for a department">
        <FeedbackBanner message={message} error={loadError || saveError} />

        <div className="space-y-8">
          <DepartmentSelect
            departments={departments}
            value={effectiveDepartmentId}
            onChange={setSelectedDepartmentId}
            disabled={loading}
          />

          <ShiftForm
            key={effectiveDepartmentId}
            initialForm={shiftForm}
            onSubmit={handleSubmit}
            saving={saving}
            disabled={!effectiveDepartmentId || loading}
          />
        </div>
      </Card>

      <Card title="Selected Department" subtitle="Current setup" compact>
        {selectedDepartment ? (
          <ShiftPreview form={shiftForm} title={selectedDepartment.name} />
        ) : (
          <p className="text-sm font-bold text-slate-400">No department selected.</p>
        )}
      </Card>
    </div>
  );
};

export default AssignShiftPage;
