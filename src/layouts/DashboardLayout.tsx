import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { getUser } from "../utils/auth.utils";
import { adminSidebarConfig } from "../config/sidebar/adminSidebar.config";
import { employeeSidebarConfig } from "../config/sidebar/employeeSidebar.config";

const DashboardLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const location = useLocation();
    const user = getUser();
    
    // Map path to active tab name for the Sidebar and Header
    const getActiveTab = () => {
        if (location.pathname.includes("/attendance")) return "Attendance";
        if (location.pathname.includes("/dashboard")) return "Dashboard";
        if (location.pathname.includes("/departments")) return "Department";
        if (location.pathname.includes("/leave")) return "Leave Management";
        if (location.pathname.includes("/payroll")) return "Payroll";
        if (location.pathname.includes("/employees")) return "Employees";
        if (location.pathname.includes("/announcements")) return "Announcements";
        return "Dashboard";
    };

    const isEmployee = location.pathname.startsWith("/employee");
    const sidebarConfig = isEmployee ? employeeSidebarConfig : adminSidebarConfig;
    const portalName = isEmployee ? "Staff Portal" : "Master Admin";

    return (
        <div className="dash-layout">
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ background: "var(--mesh-gradient)" }}></div>

            <Sidebar 
                isSidebarCollapsed={isSidebarCollapsed} 
                setIsSidebarCollapsed={setIsSidebarCollapsed} 
                activeTab={getActiveTab()} 
                user={user} 
                sidebarItems={sidebarConfig}
                portalName={portalName}
            />

            <div className={`dash-content-area relative z-10 ${isSidebarCollapsed ? 'ml-24' : 'ml-72'}`}>
                <Header activeTab={getActiveTab()} />
                <main className="p-10 space-y-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
