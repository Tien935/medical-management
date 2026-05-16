import React, { useState, useEffect } from 'react';

const MyAppointments = () => {
  const [filter, setFilter] = useState({ search: '', status: 'Tất cả' });
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [loadingRecord, setLoadingRecord] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      // In a real app, you would pass the logged in user ID to filter
      const response = await fetch("http://localhost:8081/api/appointments");
      if (response.ok) {
        const data = await response.json();
        // The backend returns an array of Appointment objects
        // We need to map them to the format the UI expects, or adjust the UI.
          const mappedData = data.map(apt => ({
          id: apt.id,
          doctor: apt.doctor ? apt.doctor.name : 'Chưa phân bổ',
          specialty: (apt.doctor && apt.doctor.specialty) ? apt.doctor.specialty.name : 'N/A',
          date: apt.date,
          time: apt.time,
          status: getStatusLabel(apt.status),
          rawStatus: apt.status,
          color: getStatusColor(apt.status)
        }));
        setAppointments(mappedData);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewRecord = async (appointmentId) => {
    setLoadingRecord(true);
    setShowRecordModal(true);
    try {
      const response = await fetch(`http://localhost:8081/api/medical-records/appointment/${appointmentId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedRecord(data);
      } else {
        setSelectedRecord(null);
      }
    } catch (error) {
      console.error("Error fetching medical record:", error);
      setSelectedRecord(null);
    } finally {
      setLoadingRecord(false);
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'PENDING': 
      case 'Chờ xác nhận': return 'Chờ xác nhận';
      case 'CONFIRMED': return 'Sắp tới';
      case 'COMPLETED': return 'Đã khám';
      case 'CANCELLED': return 'Đã hủy';
      case 'CANCEL_REQUESTED': return 'Yêu cầu hủy';
      default: return status || 'Chờ xác nhận';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'PENDING': 
      case 'Chờ xác nhận': return 'text-amber-600 bg-amber-50';
      case 'CONFIRMED': return 'text-blue-600 bg-blue-50';
      case 'COMPLETED': return 'text-green-600 bg-green-50';
      case 'CANCELLED': return 'text-red-600 bg-red-50';
      case 'CANCEL_REQUESTED': return 'text-orange-600 bg-orange-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const handleCancel = async (id, status) => {
    if (status === 'CONFIRMED') {
      if (window.confirm(`Bạn có chắc muốn gửi yêu cầu hủy lịch hẹn ${id} tới Admin không?`)) {
        try {
          const response = await fetch(`http://localhost:8081/api/appointments/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'CANCEL_REQUESTED' })
          });
          if (response.ok) {
            fetchAppointments();
            alert('Đã gửi yêu cầu hủy lịch. Vui lòng chờ Admin xác nhận.');
          } else {
            alert('Lỗi khi gửi yêu cầu hủy.');
          }
        } catch (error) {
          alert('Lỗi kết nối máy chủ.');
        }
      }
    } else {
      if (window.confirm(`Bạn có chắc chắn muốn hủy lịch hẹn ${id} không?`)) {
        try {
          const response = await fetch(`http://localhost:8081/api/appointments/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            setAppointments(prev => prev.filter(apt => apt.id !== id));
            alert('Đã hủy lịch hẹn thành công.');
          } else {
            alert('Lỗi khi hủy lịch hẹn.');
          }
        } catch (error) {
          alert('Lỗi kết nối máy chủ.');
        }
      }
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center text-slate-400 font-bold">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : filteredAppointments.length > 0 ? (
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
                      {(apt.rawStatus === 'PENDING' || apt.rawStatus === 'Chờ xác nhận' || apt.rawStatus === 'CONFIRMED') && (
                        <button 
                          onClick={() => handleCancel(apt.id, apt.rawStatus)}
                          className="w-10 h-10 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition"
                          title={apt.rawStatus === 'CONFIRMED' ? "Yêu cầu hủy" : "Hủy lịch"}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                      {(apt.rawStatus === 'COMPLETED' || apt.rawStatus === 'Đã khám') && (
                        <button 
                          onClick={() => handleViewRecord(apt.id)}
                          className="px-4 py-2 rounded-xl bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white transition font-bold text-xs uppercase tracking-wider"
                        >
                          Kết quả
                        </button>
                      )}
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

      {/* Medical Record Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-slideUp">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Kết quả khám bệnh</h3>
                <p className="text-slate-500 font-semibold text-sm mt-1">Mã lịch hẹn: {selectedRecord?.appointment?.id}</p>
              </div>
              <button 
                onClick={() => setShowRecordModal(false)}
                className="w-12 h-12 rounded-full bg-white text-slate-400 hover:text-slate-600 shadow-sm flex items-center justify-center transition"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              {loadingRecord ? (
                <div className="py-20 text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600 mx-auto mb-4"></div>
                  <p className="text-slate-500 font-bold">Đang tải kết quả...</p>
                </div>
              ) : selectedRecord ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-6 p-6 bg-teal-50 rounded-3xl border border-teal-100">
                    <div>
                      <p className="text-xs font-black text-teal-600 uppercase tracking-widest mb-1">Bác sĩ phụ trách</p>
                      <p className="font-bold text-slate-900">{selectedRecord.doctor?.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black text-teal-600 uppercase tracking-widest mb-1">Ngày khám</p>
                      <p className="font-bold text-slate-900">
                        {new Date(selectedRecord.examinationDate).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <section>
                      <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                        <i className="fas fa-stethoscope mr-2 text-teal-500"></i> Triệu chứng & Bệnh sử
                      </h4>
                      <p className="text-slate-700 bg-slate-50 p-5 rounded-2xl border border-slate-100 font-medium leading-relaxed">
                        {selectedRecord.symptoms}
                      </p>
                    </section>

                    <section>
                      <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                        <i className="fas fa-file-medical mr-2 text-teal-500"></i> Chẩn đoán
                      </h4>
                      <p className="text-slate-900 bg-blue-50/50 p-5 rounded-2xl border border-blue-100 font-bold text-lg leading-relaxed">
                        {selectedRecord.diagnosis}
                      </p>
                    </section>

                    <section>
                      <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                        <i className="fas fa-pills mr-2 text-teal-500"></i> Đơn thuốc & Điều trị
                      </h4>
                      <div className="text-slate-700 bg-amber-50/30 p-5 rounded-2xl border border-amber-100 font-medium whitespace-pre-line leading-relaxed">
                        {selectedRecord.prescription}
                      </div>
                    </section>

                    {selectedRecord.notes && (
                      <section>
                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                          <i className="fas fa-comment-medical mr-2 text-teal-500"></i> Ghi chú & Dặn dò
                        </h4>
                        <p className="text-slate-600 italic bg-slate-50 p-5 rounded-2xl border border-slate-100 font-medium leading-relaxed">
                          {selectedRecord.notes}
                        </p>
                      </section>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-file-invoice text-slate-200 text-3xl"></i>
                  </div>
                  <p className="text-slate-500 font-bold">Chưa có kết quả chi tiết cho lịch hẹn này.</p>
                </div>
              )}
            </div>
            
            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button 
                onClick={() => setShowRecordModal(false)}
                className="px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition shadow-lg"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 bg-teal-600 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl shadow-teal-100">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-2">Bạn cần khám mới?</h3>
          <p className="text-teal-50 opacity-80 max-w-md">Tiếp tục chăm sóc sức khỏe của bạn bằng cách đặt một cuộc hẹn mới ngay hôm nay.</p>
        </div>
        <button 
          onClick={() => window.location.href = "/doctors"}
          className="relative z-10 bg-white text-teal-600 font-black py-4 px-10 rounded-2xl hover:bg-teal-50 transition shadow-xl"
        >
          Đặt lịch mới
        </button>
      </div>
    </div>
  );
};

export default MyAppointments;
