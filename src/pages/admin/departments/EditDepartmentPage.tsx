import React, { useMemo, useState } from "react";
import Card from "../../../components/Card";
import DepartmentDetailsForm from "../../../features/departments/components/DepartmentDetailsForm";
import DepartmentSelect from "../../../features/departments/components/DepartmentSelect";
import FeedbackBanner from "../../../features/departments/components/FeedbackBanner";
import ShiftPreview from "../../../features/departments/components/ShiftPreview";
import { useDepartmentMutations } from "../../../features/departments/hooks/useDepartmentMutations";
import { useDepartments } from "../../../features/departments/hooks/useDepartments";
import { getShiftFormFromDepartment } from "../../../features/departments/utils/departmentShift.utils";
import type { UpdateDepartmentPayload } from "../../../types/departmentTypes";

const EditDepartmentPage = () => {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const { departments, loading, error: loadError, fetchDepartments } = useDepartments();
  const {
    saving,
    message,
    error: saveError,
    updateDepartmentRecord,
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

  const handleSubmit = async (payload: UpdateDepartmentPayload) => {
    if (!effectiveDepartmentId) return;

    const result = await updateDepartmentRecord(effectiveDepartmentId, payload);
    if (result.success) {
      await fetchDepartments();
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-8 animate-in fade-in duration-700">
      <Card title="Edit Department" subtitle="Update department name and description">
        <FeedbackBanner message={message} error={loadError || saveError} />

        <div className="space-y-8">
          <DepartmentSelect
            departments={departments}
            value={effectiveDepartmentId}
            onChange={setSelectedDepartmentId}
            disabled={loading}
          />

          {selectedDepartment ? (
            <DepartmentDetailsForm
              key={effectiveDepartmentId}
              department={selectedDepartment}
              onSubmit={handleSubmit}
              saving={saving}
              disabled={loading}
            />
          ) : (
            <p className="text-sm font-bold text-slate-400">No department selected.</p>
          )}
        </div>
      </Card>

      <Card title="Assigned Shift" subtitle="Read only" compact>
        {selectedDepartment ? (
          <ShiftPreview form={shiftForm} />
        ) : (
          <p className="text-sm font-bold text-slate-400">No department selected.</p>
        )}
      </Card>
    </div>
  );
};

export default EditDepartmentPage;
