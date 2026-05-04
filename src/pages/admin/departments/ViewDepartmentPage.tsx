import React from "react";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import DepartmentTable from "../../../features/departments/components/DepartmentTable";
import FeedbackBanner from "../../../features/departments/components/FeedbackBanner";
import { useDepartments } from "../../../features/departments/hooks/useDepartments";

const ViewDepartmentPage = () => {
  const { departments, loading, error, fetchDepartments } = useDepartments();

  return (
    <Card
      title="View Departments"
      subtitle="Department roster and assigned shift timing"
      headerAction={
        <Button variant="secondary" onClick={fetchDepartments} loading={loading}>
          Refresh
        </Button>
      }
    >
      <FeedbackBanner error={error} />
      <DepartmentTable departments={departments} loading={loading} />
    </Card>
  );
};

export default ViewDepartmentPage;
