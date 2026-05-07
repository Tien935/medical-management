import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: 'Tổng quan', path: '/admin', icon: 'fas fa-chart-pie' },
    { name: 'Lịch hẹn', path: '/admin/appointments', icon: 'fas fa-calendar-check' },
    { name: 'Bác sĩ', path: '/admin/doctors', icon: 'fas fa-user-md' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-full shadow-2xl">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center font-black text-xl shadow-lg">
          A
        </div>
        <div>
          <h2 className="text-xl font-black tracking-wider text-teal-400">ADMIN</h2>
          <p className="text-xs text-slate-400 font-bold uppercase">Portal Quản trị</p>
        </div>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-semibold
              ${isActive(item.path) 
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/50' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
          >
            <i className={`${item.icon} w-5 text-center`}></i>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-6">
        <div className="bg-slate-800 rounded-xl p-4 flex items-center justify-center gap-2 text-slate-400 text-sm">
          <i className="fas fa-shield-alt"></i>
          <span>V.1.0 Secured</span>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
