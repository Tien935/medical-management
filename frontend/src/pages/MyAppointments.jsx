import React from 'react';

const MyAppointments = () => {
  const [filter, setFilter] = React.useState({ search: '', status: 'Tất cả' });
  const [appointments, setAppointments] = React.useState([
    { id: 'PK-8241', doctor: 'BS. Nguyễn Văn An', specialty: 'Nội tổng quát', date: '2026-05-10', time: '09:00', status: 'Sắp tới', color: 'text-blue-600 bg-blue-50' },
    { id: 'PK-1290', doctor: 'ThS.BS. Trần Thị Bình', specialty: 'Nhi khoa', date: '2026-05-15', time: '14:30', status: 'Chờ xác nhận', color: 'text-amber-600 bg-amber-50' },
    { id: 'PK-0552', doctor: 'BSCKII. Lê Văn Cường', specialty: 'Tim mạch', date: '2026-04-20', time: '10:00', status: 'Đã khám', color: 'text-green-600 bg-green-50' },
  ]);

  const handleCancel = (id) => {
    if (window.confirm(`Bạn có chắc chắn muốn hủy lịch hẹn ${id} không?`)) {
      setAppointments(prev => prev.filter(apt => apt.id !== id));
      alert('Đã hủy lịch hẹn thành công.');
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.doctor.toLowerCase().includes(filter.search.toLowerCase()) || apt.id.toLowerCase().includes(filter.search.toLowerCase());
    const matchesStatus = filter.status === 'Tất cả' || apt.status === filter.status;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Lịch Hẹn Của Tôi</h1>
          <p className="text-slate-500">Quản lý các cuộc hẹn khám bệnh của bạn</p>
        </div>
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <input 
              type="text" 
              placeholder="Tìm theo bác sĩ, mã lịch..." 
              className="pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 w-full md:w-64 shadow-sm transition-all"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            />
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          </div>
          <select 
            className="px-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm transition-all font-semibold text-slate-600 cursor-pointer"
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option>Tất cả</option>
            <option>Sắp tới</option>
            <option>Chờ xác nhận</option>
            <option>Đã khám</option>
          </select>
          <button className="p-3 rounded-2xl bg-teal-600 text-white hover:bg-teal-700 transition shadow-lg shadow-teal-100 flex items-center justify-center">
            <i className="fas fa-download mr-2"></i> <span className="hidden sm:inline">Xuất file</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-6 text-sm font-black text-slate-400 uppercase tracking-widest">Mã lịch</th>
                <th className="px-8 py-6 text-sm font-black text-slate-400 uppercase tracking-widest">Bác sĩ</th>
                <th className="px-8 py-6 text-sm font-black text-slate-400 uppercase tracking-widest">Ngày & Giờ</th>
                <th className="px-8 py-6 text-sm font-black text-slate-400 uppercase tracking-widest">Trạng thái</th>
                <th className="px-8 py-6 text-sm font-black text-slate-400 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-8 py-6 font-mono font-bold text-teal-600">{apt.id}</td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-900">{apt.doctor}</p>
                      <p className="text-sm text-slate-400 font-semibold">{apt.specialty}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-900">{apt.date}</p>
                      <p className="text-sm text-slate-400 font-semibold">{apt.time}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${apt.color}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => handleCancel(apt.id)}
                        className="w-10 h-10 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition"
                        title="Hủy lịch"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center text-slate-400 font-bold">
                    Không tìm thấy lịch hẹn nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12 bg-teal-600 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl shadow-teal-100">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-2">Bạn cần khám mới?</h3>
          <p className="text-teal-50 opacity-80 max-w-md">Tiếp tục chăm sóc sức khỏe của bạn bằng cách đặt một cuộc hẹn mới ngay hôm nay.</p>
        </div>
        <button className="relative z-10 bg-white text-teal-600 font-black py-4 px-10 rounded-2xl hover:bg-teal-50 transition shadow-xl">
          Đặt lịch mới
        </button>
      </div>
    </div>
  );
};

export default MyAppointments;
