import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const MedicalRecordForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { appointmentId } = useParams();

  const appointment = state?.appointment;
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    symptoms: "",
    diagnosis: "",
    prescription: "",
    notes: "",
  });

  useEffect(() => {
    if (!appointment) {
      navigate("/doctor");
      return;
    }
    fetchPatientHistory();
  }, [appointment]);

  const fetchPatientHistory = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8081/api/medical-records/patient/${appointment.patient.id}`,
      );
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      const recordPayload = {
        patient: { id: appointment.patient.id },
        doctor: { id: appointment.doctor.id },
        appointment: { id: appointment.id },
        symptoms: formData.symptoms,
        diagnosis: formData.diagnosis,
        prescription: formData.prescription,
        notes: formData.notes,
      };

      const res = await fetch("http://localhost:8081/api/medical-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recordPayload),
      });

      if (res.ok) {
        alert("Đã lưu hồ sơ thành công!");
        navigate("/doctor");
      } else {
        throw new Error("Lỗi khi lưu hồ sơ");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (!appointment) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Column: Form */}
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {appointment.status === "Đã khám"
                ? "Chi tiết hồ sơ khám bệnh"
                : "Tạo hồ sơ khám bệnh mới"}
            </h2>
            <button
              onClick={() => navigate("/doctor")}
              className="text-gray-500 hover:text-gray-700 font-medium text-sm"
            >
              &larr; Quay lại
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-teal-50 rounded-lg border border-black-100">
            <div>
              <p className="text-sm text-gray-500">Bệnh nhân</p>
              <p className="font-semibold text-gray-900">
                {appointment.patient?.fullName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Giới tính / Tuổi</p>
              <p className="font-medium text-gray-900">N/A</p>{" "}
              {/* If age/gender is not in model, just N/A */}
            </div>
            <div>
              <p className="text-sm text-gray-500">Thời gian hẹn</p>
              <p className="font-medium text-gray-900">
                {appointment.time} - {appointment.date}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mã lịch hẹn</p>
              <p className="font-medium text-gray-900">{appointment.id}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Triệu chứng (Bệnh sử)
              </label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Mô tả triệu chứng của bệnh nhân..."
                required
                disabled={appointment.status === "Đã khám"}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chẩn đoán
              </label>
              <textarea
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Nhập chẩn đoán..."
                required
                disabled={appointment.status === "Đã khám"}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Đơn thuốc & Điều trị
              </label>
              <textarea
                name="prescription"
                value={formData.prescription}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Ghi toa thuốc và chỉ định điều trị..."
                disabled={appointment.status === "Đã khám"}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ghi chú (Tái khám, dặn dò)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Ghi chú thêm..."
                disabled={appointment.status === "Đã khám"}
              ></textarea>
            </div>

            {appointment.status !== "Đã khám" && (
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-800 transition-colors focus:ring-4 focus:ring-blue-200 disabled:opacity-50"
                >
                  {saving ? "Đang lưu..." : "Lưu hồ sơ"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Right Column: Medical History */}
      <div className="w-full lg:w-96">
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-teal-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Lịch sử khám bệnh
          </h3>

          {loading ? (
            <div className="text-center py-4 text-gray-500 text-sm">
              Đang tải lịch sử...
            </div>
          ) : history.length > 0 ? (
            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
              {history.map((record, index) => (
                <div
                  key={record.id}
                  className="border-l-2 border-teal-500 pl-4 py-2 relative"
                >
                  <div className="absolute w-3 h-3 bg-teal-500 rounded-full -left-[7px] top-3 ring-4 ring-white"></div>
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    {new Date(record.examinationDate).toLocaleString("vi-VN")}
                  </p>
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    CĐ: {record.diagnosis}
                  </p>
                  <p
                    className="text-xs text-gray-600 line-clamp-2"
                    title={record.symptoms}
                  >
                    <span className="font-medium">TC:</span> {record.symptoms}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <p className="text-sm text-gray-500">
                Bệnh nhân chưa có lịch sử khám.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordForm;
