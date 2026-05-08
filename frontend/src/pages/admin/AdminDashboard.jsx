import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { name: 'T2', appointments: 4 },
  { name: 'T3', appointments: 7 },
  { name: 'T4', appointments: 5 },
  { name: 'T5', appointments: 12 },
  { name: 'T6', appointments: 8 },
  { name: 'T7', appointments: 15 },
  { name: 'CN', appointments: 10 },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalUsers: 0,
    totalAppointments: 0,
    pendingAppointments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mt-20"></div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-lg transition">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-2xl shadow-inner">
            <i className="fas fa-users"></i>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Bệnh nhân</p>
            <h3 className="text-3xl font-black text-slate-800">{stats.totalUsers}</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-lg transition">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-500 flex items-center justify-center text-2xl shadow-inner">
            <i className="fas fa-user-md"></i>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Bác sĩ</p>
            <h3 className="text-3xl font-black text-slate-800">{stats.totalDoctors}</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-lg transition">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center text-2xl shadow-inner">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Tổng Lịch Hẹn</p>
            <h3 className="text-3xl font-black text-slate-800">{stats.totalAppointments}</h3>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-lg transition relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-2xl shadow-inner relative z-10">
            <i className="fas fa-clock"></i>
          </div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Chờ Xác Nhận</p>
            <h3 className="text-3xl font-black text-slate-800">{stats.pendingAppointments}</h3>
          </div>
          {stats.pendingAppointments > 0 && (
             <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
          )}
        </div>

      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mt-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-black text-slate-800">Biểu đồ Lịch hẹn</h2>
            <p className="text-sm font-bold text-slate-400">Thống kê số lượng lịch khám trong 7 ngày qua</p>
          </div>
          <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
            <i className="fas fa-chart-bar"></i>
          </div>
        </div>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 600 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 600 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="appointments" stroke="#0d9488" strokeWidth={4} dot={{ r: 6, fill: '#0d9488', strokeWidth: 0 }} activeDot={{ r: 8, fill: '#14b8a6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
