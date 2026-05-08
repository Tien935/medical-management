import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const navigate = useNavigate();
  const savedUser = localStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-black text-slate-800">Bảng điều khiển</h1>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-slate-800">{user?.fullName || user?.username || 'Admin'}</p>
            <p className="text-xs font-semibold text-teal-600">Quản trị viên</p>
          </div>
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold">
            <i className="fas fa-user-shield"></i>
          </div>
        </div>
        
        <div className="h-8 w-px bg-slate-200"></div>
        
        <button 
          onClick={handleLogout}
          className="text-slate-400 hover:text-red-500 transition flex items-center gap-2 font-bold text-sm"
        >
          <i className="fas fa-sign-out-alt"></i>
          <span className="hidden md:inline">Thoát</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
