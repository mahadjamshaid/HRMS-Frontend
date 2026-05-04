import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./page/login";
import Signup from "./page/signup";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AttendancePage from "./pages/admin/AttendancePage";
import AssignShiftPage from "./pages/admin/departments/AssignShiftPage";
import CreateDepartmentPage from "./pages/admin/departments/CreateDepartmentPage";
import EditDepartmentPage from "./pages/admin/departments/EditDepartmentPage";
import ViewDepartmentPage from "./pages/admin/departments/ViewDepartmentPage";
import EmployeeDashboardPage from "./pages/employee/EmployeeDashboardPage";
import EmployeeAttendancePage from "./pages/employee/EmployeeAttendancePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import ForgotPassword from "./page/forgot-password";
import ResetPassword from "./page/reset-password";
import RoleRoute from "./routes/RoleRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        <Route path="/forgot-password" element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        } />
        <Route path="/reset-password/:token" element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        } />
        {/* Admin Routes with Layout */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <RoleRoute allowedRole={"admin"}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="departments/create" element={<CreateDepartmentPage />} />
          <Route path="departments/assign-shift" element={<AssignShiftPage />} />
          <Route path="departments/view" element={<ViewDepartmentPage />} />
          <Route path="departments/edit" element={<EditDepartmentPage />} />
          {/* Redirect /admin to /admin/dashboard */}
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
        {/* Employee Routes with Layout */}
        <Route path="/employee" element={
          <ProtectedRoute>
            <RoleRoute allowedRole={"employee"}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<EmployeeDashboardPage />} />
          <Route path="attendance" element={<EmployeeAttendancePage />} />
          {/* Redirect /employee to /employee/dashboard */}
          <Route index element={<Navigate to="/employee/dashboard" replace />} />
        </Route>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
