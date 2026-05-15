import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalUsers: 0,
    totalAppointments: 0,
    pendingAppointments: 0
  });
  const [loading, setLoading] = useState(true);
  
  // Stats filters
  const [viewMode, setViewMode] = useState('monthly'); // 'daily', 'weekly', 'monthly', 'yearly'
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [chartData, setChartData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchChartData();
  }, [viewMode, selectedYear, selectedMonth, selectedDate]);

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

  const getWeekRange = (dateStr) => {
    const d = new Date(dateStr);
    const day = d.getDay();
    // Monday is the first day of the week
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.setDate(diff));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return { 
      start: monday.toISOString().split('T')[0], 
      end: sunday.toISOString().split('T')[0],
      mondayDate: monday
    };
  };

  const fetchChartData = async () => {
    setChartLoading(true);
    try {
      let url = '';
      switch(viewMode) {
        case 'daily':
          url = `http://localhost:8081/api/admin/stats/daily?date=${selectedDate}`;
          break;
        case 'weekly':
          const range = getWeekRange(selectedDate);
          url = `http://localhost:8081/api/admin/stats/weekly?startDate=${range.start}&endDate=${range.end}`;
          break;
        case 'yearly':
          url = `http://localhost:8081/api/admin/stats/yearly?year=${selectedYear}`;
          break;
        default: // monthly
          url = `http://localhost:8081/api/admin/stats/monthly?year=${selectedYear}&month=${selectedMonth}`;
      }
      
      const response = await fetch(url);
      if (response.ok) {
        const apiData = await response.json();
        
        let fullData = [];
        if (viewMode === 'daily') {
          // 24 hours
          for (let i = 0; i < 24; i++) {
            const found = apiData.find(d => d.label === i);
            fullData.push({
              name: `${i}h`,
              appointments: found ? found.value : 0
            });
          }
        } else if (viewMode === 'weekly') {
          const range = getWeekRange(selectedDate);
          const monday = range.mondayDate;
          const dayNames = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'];
          
          for (let i = 0; i < 7; i++) {
            const currentDay = new Date(monday);
            currentDay.setDate(monday.getDate() + i);
            const dayOfMonth = currentDay.getDate();
            const found = apiData.find(d => d.label === dayOfMonth);
            fullData.push({
              name: dayNames[i],
              appointments: found ? found.value : 0
            });
          }
        } else if (viewMode === 'monthly') {
          const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
          for (let i = 1; i <= daysInMonth; i++) {
            const found = apiData.find(d => d.label === i);
            fullData.push({
              name: `Ngày ${i}`,
              appointments: found ? found.value : 0
            });
          }
        } else { // yearly
          for (let i = 1; i <= 12; i++) {
            const found = apiData.find(d => d.label === i);
            fullData.push({
              name: `Tháng ${i}`,
              appointments: found ? found.value : 0
            });
          }
        }
        setChartData(fullData);
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setChartLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        <p className="mt-4 text-slate-500 font-medium">Đang tải dữ liệu tổng quan...</p>
      </div>
    );
  }

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-lg transition group">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
            <i className="fas fa-users"></i>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Bệnh nhân</p>
            <h3 className="text-3xl font-black text-slate-800">{stats.totalUsers}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-lg transition group">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-500 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
            <i className="fas fa-user-md"></i>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Bác sĩ</p>
            <h3 className="text-3xl font-black text-slate-800">{stats.totalDoctors}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-lg transition group">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Tổng Lịch Hẹn</p>
            <h3 className="text-3xl font-black text-slate-800">{stats.totalAppointments}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-lg transition relative overflow-hidden group">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-2xl shadow-inner relative z-10 group-hover:scale-110 transition-transform">
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

      {/* Chart Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mt-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-800">Thống kê Lịch hẹn</h2>
            <p className="text-sm font-bold text-slate-400">Xem báo cáo chi tiết về lượt đặt khám</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
            <select 
              className="bg-white border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-teal-500 shadow-sm"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
            >
              <option value="daily">Thống kê theo Ngày</option>
              <option value="weekly">Thống kê theo Tuần</option>
              <option value="monthly">Thống kê theo Tháng</option>
              <option value="yearly">Thống kê theo Năm</option>
            </select>

            {(viewMode === 'daily' || viewMode === 'weekly') && (
              <input 
                type="date"
                className="bg-white border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-teal-500 shadow-sm"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            )}

            {viewMode === 'monthly' && (
              <select 
                className="bg-white border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-teal-500 shadow-sm"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              >
                {months.map(m => (
                  <option key={m} value={m}>Tháng {m}</option>
                ))}
              </select>
            )}

            {(viewMode === 'monthly' || viewMode === 'yearly') && (
              <select 
                className="bg-white border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-teal-500 shadow-sm"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              >
                {years.map(y => (
                  <option key={y} value={y}>Năm {y}</option>
                ))}
              </select>
            )}
          </div>
        </div>
        
        <div className="h-96 w-full relative">
          {chartLoading && (
            <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-2xl">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
            </div>
          )}

          <ResponsiveContainer width="100%" height="100%">
            {(viewMode === 'monthly' || viewMode === 'daily') ? (
              <AreaChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontWeight: 600, fontSize: 12 }}
                  interval={viewMode === 'monthly' ? 2 : (viewMode === 'daily' ? 1 : 0)}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 600 }} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '1.25rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                  itemStyle={{ fontWeight: 'bold', color: '#0d9488' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="appointments" 
                  name="Lịch hẹn"
                  stroke="#0d9488" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  animationDuration={1500}
                />
              </AreaChart>
            ) : (
              <BarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontWeight: 600, fontSize: 12 }} 
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 600 }} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '1.25rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                  itemStyle={{ fontWeight: 'bold', color: '#8b5cf6' }}
                />
                <Bar 
                  dataKey="appointments" 
                  name="Lịch hẹn"
                  fill={viewMode === 'weekly' ? '#f59e0b' : '#8b5cf6'} 
                  radius={[8, 8, 0, 0]} 
                  barSize={viewMode === 'weekly' ? 60 : 40}
                  animationDuration={1500}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
