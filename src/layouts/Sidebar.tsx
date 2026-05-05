import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { logout } from "../utils/auth.utils";
import type { SidebarItem } from "../types/sideBarTypes";
import type { AuthenticatedUser } from "../types/auth";

interface SidebarProps {
    isSidebarCollapsed: boolean;
    setIsSidebarCollapsed: (collapsed: boolean) => void;
    activeTab: string;
    user: AuthenticatedUser | null;
    sidebarItems: SidebarItem[];
    portalName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarCollapsed, setIsSidebarCollapsed, activeTab, user, sidebarItems, portalName = "Admin" }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [expandedItem, setExpandedItem] = useState("");

    useEffect(() => {
        const activeParent = sidebarItems.find((item) =>
            item.children?.some((child) => location.pathname === child.path)
        );

        if (activeParent) {
            const timer = setTimeout(() => {
                setExpandedItem(activeParent.label);
            }, 0);

            return () => clearTimeout(timer);
        }
    }, [location.pathname, sidebarItems]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isPathActive = (path: string) => location.pathname === path;

    const isItemActive = (item: SidebarItem) => {
        if (activeTab === item.label) return true;
        if (item.path && isPathActive(item.path)) return true;
        return item.children?.some((child) => isPathActive(child.path));
    };

    const handleItemClick = (item: SidebarItem) => {
        if (!item.children) {
            if (item.path) {
                navigate(item.path)
            };
            return;
        }

        if (isSidebarCollapsed) {
            if (item.path) {
                navigate(item.path)
            } else if (item.children && item.children.length > 0) {
                navigate(item.children[0].path)
            }
            return;
        }

        setExpandedItem((current) => current === item.label ? "" : item.label);
    };

    return (
        <aside className={`bg-white/70 backdrop-blur-2xl border-r border-white/40 shadow-2xl flex flex-col fixed inset-y-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isSidebarCollapsed ? 'w-24' : 'w-72'}`}>
            <div className="dash-sidebar-header">
                <div className={`flex items-center gap-4 ${isSidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                    <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                        <img src={logo} alt="xNerds" className="h-6 w-auto invert brightness-0" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-slate-900">xNerds</span>
                </div>
                <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="dash-btn-icon hover:bg-slate-100/50">
                    <svg className={`w-5 h-5 transition-transform duration-500 ${isSidebarCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            <nav className="dash-sidebar-nav">
                {sidebarItems.map((item) => {
                    const active = isItemActive(item);
                    const expanded = expandedItem === item.label;

                    return (
                        <div key={item.label}>
                            <button
                                onClick={() => handleItemClick(item)}
                                className={`dash-sidebar-item group ${isSidebarCollapsed ? 'justify-center px-0' : ''} ${active ? 'dash-sidebar-item-active' : ''}`}
                            >
                                <svg className={`h-5 w-5 flex-shrink-0 transition-colors ${active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-900'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                </svg>
                                <span className={`tracking-tight flex-1 text-left transition-all duration-300 ${isSidebarCollapsed ? 'opacity-0 invisible w-0' : 'opacity-100 visible delay-150'}`}>
                                    {item.label}
                                </span>
                                {item.children && !isSidebarCollapsed && (
                                    <svg className={`w-4 h-4 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                            </button>

                            {item.children && expanded && !isSidebarCollapsed && (
                                <div className="ml-8 mt-1.5 mb-2 space-y-1">
                                    {item.children.map((child) => (
                                        <button
                                            key={child.label}
                                            onClick={() => navigate(child.path)}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black transition-all ${isPathActive(child.path) ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'}`}
                                        >
                                            {child.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            <div className={`dash-sidebar-footer transition-all duration-500 ${isSidebarCollapsed ? 'p-3' : 'p-6'}`}>
                <div className={`bg-slate-50/50 rounded-[2rem] border border-slate-100/50 backdrop-blur-sm transition-all duration-500 ${isSidebarCollapsed ? 'p-2' : 'p-6'}`}>
                    <div className={`flex items-center mb-6 transition-all duration-500 ${isSidebarCollapsed ? 'justify-center gap-0' : 'gap-4'}`}>
                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex-shrink-0 flex items-center justify-center font-black text-indigo-600 border border-slate-100 font-sans">
                            {user?.username?.charAt(0).toUpperCase() }
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'opacity-0 w-0 invisible' : 'opacity-100 visible delay-150'}`}>
                            <p className="text-sm font-black text-slate-900 truncate font-sans uppercase">{user?.username || "User"}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-sans">{portalName}</p>
                        </div>
                    </div>
                    
                    <button onClick={handleLogout} className={`w-full py-3 bg-white hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded-xl font-bold text-xs transition-all border border-slate-100 shadow-sm active:scale-95 flex items-center justify-center overflow-hidden ${isSidebarCollapsed ? 'gap-0' : 'gap-2'}`}>
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className={`transition-all duration-300 font-sans uppercase tracking-widest text-[10px] ${isSidebarCollapsed ? 'opacity-0 w-0 invisible' : 'opacity-100 visible delay-150'}`}>
                            SIGN OUT
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
