import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // 1. Get Doctor profile for the logged in User
      const doctorRes = await fetch(
        `http://localhost:8081/api/doctors/user/${user.id}`,
      );
      if (!doctorRes.ok) {
        throw new Error("Không tìm thấy thông tin bác sĩ");
      }
      const doctorData = await doctorRes.json();

      // 2. Get Appointments for this Doctor
      const appRes = await fetch(
        `http://localhost:8081/api/appointments/doctor/${doctorData.id}`,
      );
      if (!appRes.ok) throw new Error("Không thể tải lịch hẹn");

      const appData = await appRes.json();
      setAppointments(appData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExamine = (appointment) => {
    // Pass appointment and patient info to MedicalRecordForm
    navigate(`/doctor/examine/${appointment.id}`, { state: { appointment } });
  };

  // Filter for today's appointments (simplified for demo: showing all pending/upcoming or today)
  // In a real app, we'd filter by appointment.date === today
  const today = new Date().toISOString().split("T")[0];
  const todaysAppointments = appointments.filter(
    (app) =>
      app.date === today ||
      app.status === "PENDING" ||
      app.status === "CONFIRMED" ||
      app.status === "Chờ xác nhận" ||
      app.status === "Sắp tới",
  );

  if (loading)
    return <div className="p-6 text-center">Đang tải lịch hẹn...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Lịch khám hôm nay</h1>
        <div className="bg-teal-100 text-teal-800 px-4 py-2 rounded-lg font-medium">
          {todaysAppointments.length} lịch hẹn
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Bệnh nhân
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Mã BN
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {todaysAppointments.length > 0 ? (
                todaysAppointments.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {app.time}
                      </div>
                      <div className="text-sm text-gray-500">{app.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {app.patient?.fullName || "N/A"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {app.patient?.phone || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-mono">
                        {app.patient?.id || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          app.status === "CONFIRMED" || app.status === "Sắp tới"
                            ? "bg-teal-100 text-teal-800"
                            : app.status === "COMPLETED" ||
                                app.status === "Đã khám"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {app.status === "PENDING" ||
                        app.status === "Chờ xác nhận"
                          ? "Chờ xác nhận"
                          : app.status === "CONFIRMED" ||
                              app.status === "Sắp tới"
                            ? "Sắp tới"
                            : app.status === "COMPLETED" ||
                                app.status === "Đã khám"
                              ? "Đã khám"
                              : app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {(app.status === "CONFIRMED" || app.status === "Sắp tới") && (
                        <button
                          onClick={() => handleExamine(app)}
                          className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
                        >
                          Khám bệnh
                        </button>
                      )}
                      {(app.status === "PENDING" || app.status === "Chờ xác nhận") && (
                        <button
                          disabled
                          className="px-4 py-2 bg-gray-300 text-gray-500 text-sm font-medium rounded-lg cursor-not-allowed shadow-sm"
                          title="Vui lòng chờ Admin xác nhận lịch hẹn này"
                        >
                          Chờ duyệt
                        </button>
                      )}
                      {(app.status === "COMPLETED" ||
                        app.status === "Đã khám") && (
                        <button
                          onClick={() => handleExamine(app)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Xem hồ sơ
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Không có lịch khám nào hôm nay
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
