import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { useAdminAttendanceStats } from "../../features/attendance/hooks/useAdminAttendanceStats";
import AttendanceViewAdmin from "../../features/attendance/components/AttendanceView.admin";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Badge from "../../components/Badge";

const AdminDashboardPage = () => {
    const { stats, recentAttendance, fetchStatsAndRecent } = useAdminAttendanceStats();
    const navigate = useNavigate();
    useEffect(() => {
        fetchStatsAndRecent();
    }, [fetchStatsAndRecent]);

    return (
        <div className="animate-in fade-in duration-1000">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                {stats.map((s, i) => (
                    <Card compact key={i} className="group relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-1.5 h-full ${s.color.replace('text', 'bg')}`}></div>
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl ${s.bg} ${s.color} transition-transform group-hover:scale-110 duration-500`}>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
                                    {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                                    {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
                                    {i === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                                </svg>
                            </div>
                            <Badge variant="neutral">{s.trend}</Badge>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-1">{s.value}</h3>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-tight">{s.label}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Attendance Table */}
                <Card 
                    className="lg:col-span-2"
                    title="Real-time Attendance"
                    subtitle="Live feed of employee check-ins"
                    headerAction={<Button 
                        variant="secondary" 
                        size="sm"
                        onClick = {() => navigate("/admin/attendance")}
                        >View All Logs</Button>}
                >
                    <div className="overflow-hidden mt-4">
                        <AttendanceViewAdmin data={recentAttendance} loading={false} />
                    </div>
                </Card>

                {/* Quick Actions & Insights */}
                <div className="space-y-10">
                    <Card title="Quick Actions">
                        <div className="space-y-4">
                            <Button variant="primary" className="w-full" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>}>
                                Add Employee
                            </Button>
                            <Button variant="secondary" className="w-full" icon={<svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>}>
                                Broadcast News
                            </Button>
                        </div>
                    </Card>

                    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/40 transition-colors duration-700"></div>
                        <h3 className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">System Analytics</h3>
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between items-end mb-3"><span className="text-xs font-bold text-slate-400">Database Performance</span><span className="text-sm font-black text-emerald-400">99.9%</span></div>
                                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[99.9%] transition-all duration-1000 delay-500"></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between items-end mb-3"><span className="text-xs font-bold text-slate-400">Server Latency</span><span className="text-sm font-black text-indigo-400">24ms</span></div>
                                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-[15%] transition-all duration-1000 delay-700"></div></div>
                            </div>
                        </div>
                        <div className="mt-10 pt-8 border-t border-slate-800/50">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Version 4.2.4-Production</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
