import React, { useState } from 'react';

const PatientInfoStep = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="animate-fadeIn max-w-2xl mx-auto">
      <button 
        onClick={onBack}
        className="mb-8 text-slate-500 hover:text-teal-600 flex items-center gap-2 font-semibold transition"
      >
        <i className="fas fa-arrow-left"></i> Quay lại
      </button>

      <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl">
        <h3 className="text-2xl font-bold text-slate-800 mb-8">Thông tin bệnh nhân</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Họ và tên *</label>
            <input 
              required
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên đầy đủ"
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white outline-none transition-all duration-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Số điện thoại *</label>
              <input 
                required
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white outline-none transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email (không bắt buộc)"
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white outline-none transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Lý do khám</label>
            <textarea 
              name="reason"
              rows="4"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Mô tả sơ lược tình trạng sức khỏe của bạn"
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white outline-none transition-all duration-300 resize-none"
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Xác nhận đặt lịch
            </button>
            <p className="text-center text-slate-400 text-sm mt-4">
              <i className="fas fa-lock mr-2"></i> Thông tin của bạn được bảo mật tuyệt đối
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientInfoStep;
