import React, { useState, useEffect } from "react";

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Patient Form Modal states
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [patientFormData, setPatientFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
    role: "PATIENT",
  });

  // Details Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming"); // 'upcoming' or 'history'

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8081/api/users?role=PATIENT",
      );
      if (response.ok) {
        const data = await response.json();
        setPatients(data);
      }
    } catch (error) {
      console.error("Error fetching patients", error);
    } finally {
      setLoading(false);
    }
  };

  const openAddPatientForm = () => {
    setEditingPatient(null);
    setPatientFormData({
      username: "",
      password: "",
      fullName: "",
      email: "",
      phone: "",
      role: "PATIENT",
    });
    setShowPatientForm(true);
  };

  const openEditPatientForm = (patient) => {
    setEditingPatient(patient);
    setPatientFormData({
      username: patient.username || "",
      password: "", // Leave empty for edit unless they want to change it
      fullName: patient.fullName || "",
      email: patient.email || "",
      phone: patient.phone || "",
      role: "PATIENT",
    });
    setShowPatientForm(true);
  };

  const handlePatientSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = "http://localhost:8081/api/auth/register";
      let method = "POST";

      let payload = { ...patientFormData };

      if (!editingPatient) {
        // Auto-generate username and password for new patients
        payload.username =
          payload.phone || payload.email.split("@")[0] || `bn_${Date.now()}`;
        payload.password = "123456"; // Default password
      } else {
        url = `http://localhost:8081/api/users/${editingPatient.id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowPatientForm(false);
        fetchPatients();
        alert(
          editingPatient
            ? "Cập nhật thành công!"
            : "Thêm bệnh nhân thành công!",
        );
      } else {
        const errText = await response.text();
        alert(`Có lỗi xảy ra: ${errText}`);
      }
    } catch (error) {
      alert("Lỗi kết nối máy chủ");
    }
  };

  const formatPatientId = (id) => {
    return `BN-${String(id).padStart(4, "0")}`;
  };

  const handleViewDetails = async (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
    setLoadingAppointments(true);
    try {
      const response = await fetch(
        `http://localhost:8081/api/appointments/patient/${patient.id}`,
      );
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error("Error fetching appointments", error);
    } finally {
      setLoadingAppointments(false);
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

  const upcomingAppointments = appointments.filter(
    (a) => a.status === "Sắp tới" || a.status === "Chờ xác nhận" || a.status === "PENDING" || a.status === "CONFIRMED",
  );
  const historyAppointments = appointments.filter(
    (a) => a.status === "Đã khám" || a.status === "Đã hủy" || a.status === "COMPLETED" || a.status === "CANCELLED" || a.status === "CANCEL_REQUESTED",
  );

  const filteredPatients = patients.filter(
    (patient) =>
      patient.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone?.includes(searchTerm) ||
      formatPatientId(patient.id)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">
            Quản lý Bệnh nhân
          </h2>
          <p className="text-slate-500 font-semibold mt-1">
            Danh sách bệnh nhân đã đăng ký trên hệ thống
          </p>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Tìm kiếm bệnh nhân..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
          </div>
          <div className="bg-teal-50 text-teal-600 px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap flex items-center h-full border border-teal-100">
            Tổng: {patients.length}
          </div>
          <button
            onClick={openAddPatientForm}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap flex items-center gap-2 transition shadow-sm h-full"
          >
            <i className="fas fa-plus"></i> Thêm bệnh nhân
          </button>
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
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider">
                    Mã BN
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider">
                    Thông tin bệnh nhân
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider">
                    Liên hệ
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider text-right">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="hover:bg-slate-50 transition group"
                    >
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg font-mono text-sm font-bold border border-slate-200 shadow-sm">
                          {formatPatientId(patient.id)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-lg">
                            {patient.fullName?.charAt(0) || "U"}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-base">
                              {patient.fullName || "Chưa cập nhật"}
                            </p>
                            <p className="text-xs text-slate-400 font-medium">
                              Username: {patient.username}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center text-sm text-slate-600">
                            <i className="far fa-envelope w-5 text-slate-400"></i>
                            <span
                              className={
                                patient.email ? "" : "italic text-slate-400"
                              }
                            >
                              {patient.email || "Chưa cập nhật"}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-slate-600">
                            <i className="fas fa-phone-alt w-5 text-slate-400"></i>
                            <span
                              className={
                                patient.phone ? "" : "italic text-slate-400"
                              }
                            >
                              {patient.phone || "Chưa cập nhật"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleViewDetails(patient)}
                          className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white transition shadow-sm inline-flex items-center justify-center mr-2"
                          title="Xem chi tiết"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          onClick={() => openEditPatientForm(patient)}
                          className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 hover:bg-blue-600 hover:text-white transition shadow-sm inline-flex items-center justify-center"
                          title="Sửa thông tin"
                        >
                          <i className="fas fa-user-edit"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-8 text-center text-slate-500 font-medium"
                    >
                      Không tìm thấy bệnh nhân nào phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl my-8 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-start shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-3xl">
                  {selectedPatient.fullName?.charAt(0) || "U"}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {selectedPatient.fullName}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <i className="fas fa-id-card text-slate-400"></i>{" "}
                      {formatPatientId(selectedPatient.id)}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="far fa-envelope text-slate-400"></i>{" "}
                      {selectedPatient.email || "N/A"}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="fas fa-phone-alt text-slate-400"></i>{" "}
                      {selectedPatient.phone || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition flex items-center justify-center"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex-1 overflow-y-auto bg-slate-50/50">
              {/* Tabs */}
              <div className="flex gap-4 border-b border-slate-200 mb-6">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`pb-4 px-4 font-bold text-sm transition-colors border-b-2 ${activeTab === "upcoming" ? "border-teal-600 text-teal-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                >
                  <i className="far fa-calendar-alt mr-2"></i> Lịch hẹn sắp tới
                  <span className="ml-2 bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-xs">
                    {upcomingAppointments.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`pb-4 px-4 font-bold text-sm transition-colors border-b-2 ${activeTab === "history" ? "border-teal-600 text-teal-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                >
                  <i className="fas fa-history mr-2"></i> Lịch sử khám
                  <span className="ml-2 bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-xs">
                    {historyAppointments.length}
                  </span>
                </button>
              </div>

              {/* Tab Content */}
              {loadingAppointments ? (
                <div className="py-12 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
                  <p className="text-slate-400 mt-4 font-medium text-sm">
                    Đang tải dữ liệu...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeTab === "upcoming" &&
                    (upcomingAppointments.length > 0 ? (
                      <div className="grid gap-4">
                        {upcomingAppointments.map((app) => (
                          <div
                            key={app.id}
                            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div className="flex gap-4 items-start">
                              <div className="bg-teal-50 w-14 h-14 rounded-xl flex flex-col items-center justify-center text-teal-600 shrink-0 border border-teal-100">
                                <span className="text-xs font-bold uppercase">
                                  {app.date
                                    ? new Date(app.date).toLocaleDateString(
                                        "vi-VN",
                                        { month: "short" },
                                      )
                                    : ""}
                                </span>
                                <span className="text-xl font-black leading-none">
                                  {app.date ? new Date(app.date).getDate() : ""}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                  {app.id}
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${app.status === "Sắp tới" || app.status === "CONFIRMED" ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"}`}
                                  >
                                    {getStatusLabel(app.status)}
                                  </span>
                                </h4>
                                <p className="text-sm font-semibold text-slate-500 mt-1">
                                  <i className="far fa-clock mr-1"></i>{" "}
                                  {app.time}
                                </p>
                                {app.doctor && (
                                  <p className="text-sm font-semibold text-slate-600 mt-1">
                                    <i className="fas fa-user-md mr-1 text-slate-400"></i>{" "}
                                    Bác sĩ: {app.doctor.name}
                                  </p>
                                )}
                              </div>
                            </div>
                            {app.notes && (
                              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm text-slate-600 md:max-w-xs">
                                <span className="font-bold text-slate-700">
                                  Lý do khám:
                                </span>{" "}
                                {app.notes}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed">
                        <i className="far fa-calendar-times text-4xl text-slate-300 mb-3"></i>
                        <p className="text-slate-500 font-medium">
                          Bệnh nhân không có lịch hẹn nào sắp tới.
                        </p>
                      </div>
                    ))}

                  {activeTab === "history" &&
                    (historyAppointments.length > 0 ? (
                      <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pb-4">
                        {historyAppointments.map((app) => (
                          <div key={app.id} className="relative pl-8">
                            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-teal-500 border-4 border-slate-50"></div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md mb-2 inline-block">
                                    {app.date} • {app.time}
                                  </span>
                                  <h4 className="font-black text-slate-800 text-lg">
                                    Khám{" "}
                                    {app.doctor?.specialty?.name || "Tổng quát"}
                                  </h4>
                                </div>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-black uppercase ${app.status === "Đã khám" || app.status === "COMPLETED" ? "bg-teal-100 text-teal-600" : "bg-red-100 text-red-600"}`}
                                >
                                  {getStatusLabel(app.status)}
                                </span>
                              </div>
                              <div className="text-sm font-semibold text-slate-600 mb-4">
                                <i className="fas fa-user-md text-slate-400 mr-2"></i>{" "}
                                Bác sĩ phụ trách:{" "}
                                <span className="text-slate-800">
                                  {app.doctor?.name}
                                </span>
                              </div>
                              {(app.status === "Đã khám" || app.status === "COMPLETED") && app.notes && (
                                <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100/50">
                                  <h5 className="text-xs font-black text-teal-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <i className="fas fa-notes-medical"></i> Kết
                                    luận / Ghi chú
                                  </h5>
                                  <p className="text-sm text-slate-700 leading-relaxed">
                                    {app.notes}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed">
                        <i className="fas fa-notes-medical text-4xl text-slate-300 mb-3"></i>
                        <p className="text-slate-500 font-medium">
                          Chưa có lịch sử khám bệnh.
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Patient Add/Edit Form Modal */}
      {showPatientForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">
                {editingPatient ? "Cập nhật Bệnh nhân" : "Thêm Bệnh nhân mới"}
              </h3>
              <button
                onClick={() => setShowPatientForm(false)}
                className="text-slate-400 hover:text-slate-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handlePatientSubmit} className="p-6 space-y-4">
              {/* Username and Password fields have been removed as requested. They are auto-generated. */}
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">
                  Họ và tên *
                </label>
                <input
                  required
                  type="text"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none placeholder-slate-300"
                  placeholder="Nguyễn Văn A"
                  value={patientFormData.fullName}
                  onChange={(e) =>
                    setPatientFormData({
                      ...patientFormData,
                      fullName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-1">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full p-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none placeholder-slate-300"
                    placeholder="email@example.com"
                    value={patientFormData.email}
                    onChange={(e) =>
                      setPatientFormData({
                        ...patientFormData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none placeholder-slate-300"
                    placeholder="0912345678"
                    value={patientFormData.phone}
                    onChange={(e) =>
                      setPatientFormData({
                        ...patientFormData,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPatientForm(false)}
                  className="px-6 py-2.5 rounded-full font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-600/30 transition"
                >
                  {editingPatient ? "Lưu thay đổi" : "Thêm bệnh nhân"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePatients;
