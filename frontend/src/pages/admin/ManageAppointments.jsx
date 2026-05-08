import React, { useState, useEffect } from 'react';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8081/api/appointments');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error("Error fetching appointments", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8081/api/appointments/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchAppointments();
      } else {
        alert("Cập nhật trạng thái thất bại");
      }
    } catch (error) {
      alert("Lỗi kết nối máy chủ");
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'PENDING': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'CONFIRMED': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'COMPLETED': return 'text-green-600 bg-green-50 border-green-200';
      case 'CANCELLED': return 'text-red-600 bg-red-50 border-red-200';
      case 'CANCEL_REQUESTED': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Quản lý Lịch hẹn</h2>
          <p className="text-slate-500 font-semibold mt-1">Hệ thống đang có {appointments.length} lịch hẹn</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider">Mã lịch</th>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider">Bệnh nhân</th>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider">Bác sĩ</th>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider">Thời gian</th>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider">Trạng thái</th>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider text-right">Duyệt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.map(apt => (
                  <tr key={apt.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-mono font-bold text-teal-600">{apt.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{apt.patientName || (apt.patient ? apt.patient.fullName : 'N/A')}</p>
                      <p className="text-xs font-semibold text-slate-400">{apt.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{apt.doctor?.name || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{apt.date}</p>
                      <p className="text-xs font-semibold text-slate-400">{apt.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${getStatusColor(apt.status)}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {apt.status === 'PENDING' && (
                        <>
                          <button onClick={() => updateStatus(apt.id, 'CONFIRMED')} className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition mr-2" title="Xác nhận">
                            <i className="fas fa-check"></i>
                          </button>
                          <button onClick={() => updateStatus(apt.id, 'CANCELLED')} className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition" title="Hủy bỏ">
                            <i className="fas fa-times"></i>
                          </button>
                        </>
                      )}
                      {apt.status === 'CONFIRMED' && (
                        <button onClick={() => updateStatus(apt.id, 'COMPLETED')} className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition" title="Đánh dấu đã khám">
                          <i className="fas fa-flag-checkered"></i>
                        </button>
                      )}
                      {apt.status === 'CANCEL_REQUESTED' && (
                        <>
                          <button onClick={() => updateStatus(apt.id, 'CANCELLED')} className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition mr-2" title="Đồng ý hủy">
                            <i className="fas fa-check-circle"></i>
                          </button>
                          <button onClick={() => updateStatus(apt.id, 'CONFIRMED')} className="p-2 rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100 transition" title="Từ chối hủy">
                            <i className="fas fa-times-circle"></i>
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAppointments;
