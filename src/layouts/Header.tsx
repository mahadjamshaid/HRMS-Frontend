import React from "react";
import { HeaderProps } from "../types/headerType";
import { getHeaderWeekday, getHeaderFullDate } from "../utils/dateUtils";

const Header = ({ activeTab }: HeaderProps) => {
    return (
        <header className="dash-header">
            <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter">{activeTab}</h2>
                <p className="text-sm font-bold text-slate-400">Welcome back to your workspace</p>
            </div>
            <div className="flex items-center gap-8">
                <div className="hidden lg:flex items-center gap-4 bg-slate-50/50 px-6 py-3 rounded-2xl border border-slate-100">
                    <div className="text-right">
                        <p className="text-sm font-black text-slate-900 leading-none">{getHeaderWeekday()}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{getHeaderFullDate()}</p>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 border border-slate-100">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                </div>
                <button className="relative w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all hover:-translate-y-0.5">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
