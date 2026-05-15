import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const DoctorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoctorDetail();
  }, [id]);

  const fetchDoctorDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8081/api/doctors/${id}`);
      if (!response.ok) {
        throw new Error('Bác sĩ không tồn tại hoặc đã ngừng công tác');
      }
      const data = await response.json();
      if (!data) {
        throw new Error('Bác sĩ không tồn tại hoặc đã ngừng công tác');
      }
      setDoctor(data);
    } catch (err) {
      setError(err.message);
      // Wait a bit then redirect
      setTimeout(() => {
        navigate('/doctors');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = () => {
    navigate("/booking", {
      state: { doctor, specialty: { name: doctor.specialty?.name || '' } },
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        <p className="mt-4 text-gray-500 font-bold">Đang tải thông tin bác sĩ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg shadow-red-100">
          <i className="fas fa-user-times"></i>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase">{error}</h2>
        <p className="text-gray-500 font-bold mb-8">Bạn sẽ được chuyển hướng về danh sách bác sĩ trong giây lát...</p>
        <Link to="/doctors" className="bg-teal-600 text-white px-8 py-3 rounded-xl font-black shadow-lg shadow-teal-100 uppercase transition hover:scale-105 active:scale-95 inline-block">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 animate-fadeIn">
      {/* Breadcrumb & Navigation */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
          <Link to="/" className="hover:text-teal-600 transition">Trang chủ</Link>
          <i className="fas fa-chevron-right text-[10px]"></i>
          <Link to="/doctors" className="hover:text-teal-600 transition">Bác sĩ</Link>
          <i className="fas fa-chevron-right text-[10px]"></i>
          <span className="text-slate-600">{doctor.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-10">
              <div className="relative group overflow-hidden rounded-3xl mb-8">
                <img 
                  src={doctor.imageUrl} 
                  alt={doctor.name} 
                  className="w-full aspect-[4/5] object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-teal-500 text-white px-4 py-2 rounded-2xl shadow-xl font-black text-[10px] uppercase tracking-widest">
                  Chuyên gia y tế
                </div>
              </div>

              <div className="text-center space-y-2 mb-8">
                <span className="text-teal-600 font-black text-xs uppercase tracking-[0.2em]">{doctor.degree}</span>
                <h1 className="text-3xl font-black text-slate-900 leading-tight">{doctor.name}</h1>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-xs">{doctor.specialty?.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-2xl text-center">
                  <p className="text-teal-600 font-black text-xl mb-1">{doctor.experience.split(' ')[0]}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Năm Kinh Nghiệm</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl text-center">
                  <p className="text-teal-600 font-black text-xl mb-1">500+</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bệnh Nhân</p>
                </div>
              </div>

              <button 
                onClick={handleBooking}
                className="w-full bg-teal-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-teal-200 transition-all hover:scale-[1.02] active:scale-95 group overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-widest">
                  Đặt lịch khám ngay
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </span>
                <div className="absolute top-0 left-0 w-full h-full bg-slate-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 opacity-10"></div>
              </button>
            </div>
          </div>

          {/* Right Column: Detailed Info */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview Section */}
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4">
                <span className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center text-lg shadow-inner">
                  <i className="fas fa-info-circle"></i>
                </span>
                Giới thiệu bác sĩ
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 text-lg leading-relaxed font-medium whitespace-pre-line">
                  {doctor.description || "Đang cập nhật thông tin chi tiết về bác sĩ..."}
                </p>
              </div>
            </div>

            {/* Experience & Education Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <i className="fas fa-graduation-cap text-teal-500"></i>
                  Học vấn & Bằng cấp
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal-500 mt-2"></div>
                    <div>
                      <p className="font-black text-slate-700">{doctor.degree}</p>
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-tight">Đại học Y Hà Nội</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <i className="fas fa-briefcase text-teal-500"></i>
                  Kinh nghiệm
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal-500 mt-2"></div>
                    <div>
                      <p className="font-black text-slate-700">{doctor.experience}</p>
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-tight">Công tác tại các BV Lớn</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Schedule Section */}
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-4">
                  <span className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center text-lg shadow-inner">
                    <i className="fas fa-calendar-alt"></i>
                  </span>
                  Lịch khám hiện có
                </h2>
                <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Đang hoạt động
                </div>
              </div>

              <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <i className="fas fa-calendar-check text-9xl text-teal-600"></i>
                </div>
                
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                  <div className="space-y-4">
                    <p className="text-slate-400 font-black text-xs uppercase tracking-widest">Ngày làm việc</p>
                    <p className="text-2xl font-black text-slate-800">Thứ 2 — Chủ Nhật</p>
                    <p className="text-slate-500 font-medium">Lịch làm việc cố định hàng tuần, luôn sẵn sàng phục vụ và chăm sóc sức khỏe cho bệnh nhân.</p>
                  </div>
                  
                  <div className="md:pl-8 space-y-6 pt-6 md:pt-0">
                    <p className="text-slate-400 font-black text-xs uppercase tracking-widest">Khung giờ khám</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-teal-600 font-black text-sm uppercase mb-1">Ca Sáng</p>
                        <p className="text-xl font-black text-slate-800">07:00 - 12:00</p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-orange-500 font-black text-sm uppercase mb-1">Ca Chiều</p>
                        <p className="text-xl font-black text-slate-800">13:00 - 17:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailPage;
