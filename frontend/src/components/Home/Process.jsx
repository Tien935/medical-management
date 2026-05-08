import React from 'react';

const Process = () => {
  return (
    <section id="process" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Trái: Text & Hình ảnh */}
          <div>
            <h2 className="text-4xl font-bold mb-6 uppercase text-gray-800">
              Quy trình thăm khám đơn giản
            </h2>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              Xóa tan nỗi ám ảnh chờ đợi với quy trình khám bệnh 4 bước chuẩn
              hóa. Từ đặt lịch chủ động, check-in siêu tốc đến thăm khám tận
              tâm và nhận kết quả nhanh gọn. Chúng tôi mang đến trải nghiệm y
              tế hiện đại.
            </p>
            {/* Ảnh mô phỏng đội ngũ bác sĩ */}
            <div
              className="w-full h-80 bg-teal-50 rounded-[2.5rem] flex items-center justify-center overflow-hidden shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Đội ngũ bác sĩ"
                className="w-full h-full object-cover transform hover:scale-110 transition duration-700"
              />
            </div>
          </div>

          {/* Phải: 4 Bước Grid 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bước 1 */}
            <div
              className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-gray-50 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className="absolute top-2 right-4 text-6xl font-extrabold text-gray-50 group-hover:text-teal-50 transition-colors"
              >
                01
              </div>
              <div
                className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 relative z-10"
              >
                <i className="far fa-calendar-check text-2xl text-teal-600"></i>
              </div>
              <h4 className="font-bold text-xl mb-3 relative z-10 text-gray-800">
                Đặt Lịch Khám
              </h4>
              <p className="text-gray-500 text-sm relative z-10 leading-relaxed">
                Khách hàng đặt lịch khám qua website hoặc hotline.
              </p>
            </div>
            {/* Bước 2 */}
            <div
              className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-gray-50 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className="absolute top-2 right-4 text-6xl font-extrabold text-gray-50 group-hover:text-teal-50 transition-colors"
              >
                02
              </div>
              <div
                className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 relative z-10"
              >
                <i className="fas fa-clipboard-user text-2xl text-teal-600"></i>
              </div>
              <h4 className="font-bold text-xl mb-3 relative z-10 text-gray-800">Tiếp Đón</h4>
              <p className="text-gray-500 text-sm relative z-10 leading-relaxed">
                Check-in nhanh chóng khi đặt lịch trước qua hệ thống.
              </p>
            </div>
            {/* Bước 3 */}
            <div
              className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-gray-50 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className="absolute top-2 right-4 text-6xl font-extrabold text-gray-50 group-hover:text-teal-50 transition-colors"
              >
                03
              </div>
              <div
                className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 relative z-10"
              >
                <i className="fas fa-user-doctor text-2xl text-teal-600"></i>
              </div>
              <h4 className="font-bold text-xl mb-3 relative z-10 text-gray-800">
                Thăm Khám & Tư Vấn
              </h4>
              <p className="text-gray-500 text-sm relative z-10 leading-relaxed">
                Bác sĩ trực tiếp kiểm tra, đánh giá tình trạng sức khỏe.
              </p>
            </div>
            {/* Bước 4 */}
            <div
              className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-gray-50 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className="absolute top-2 right-4 text-6xl font-extrabold text-gray-50 group-hover:text-teal-50 transition-colors"
              >
                04
              </div>
              <div
                className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 relative z-10"
              >
                <i className="fas fa-file-medical text-2xl text-teal-600"></i>
              </div>
              <h4 className="font-bold text-xl mb-3 relative z-10 text-gray-800">
                Nhận Kết Quả
              </h4>
              <p className="text-gray-500 text-sm relative z-10 leading-relaxed">
                Dễ dàng tra cứu, lưu trữ kết quả khám điện tử mọi lúc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
