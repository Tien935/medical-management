import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <span
          className="bg-teal-100 text-teal-700 px-4 py-1 rounded-full text-sm font-semibold inline-block mb-4"
        >
          Thương hiệu VietNam
        </span>
        <h2 className="text-4xl font-bold mb-4 uppercase text-gray-800">
          Dịch vụ tại phòng khám
        </h2>
        <p className="text-gray-600 mb-16 max-w-2xl mx-auto text-lg">
          Giúp bạn khám đúng người - đúng bệnh, tiếp cận hệ thống phòng khám
          đối tác đạt chuẩn, và chủ động lựa chọn thời gian.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Gói khám tổng quát */}
          <div
            className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col items-start text-left group"
          >
            <div
              className="bg-teal-50 p-5 rounded-2xl mb-6 group-hover:bg-teal-100 transition-colors"
            >
              <i className="fas fa-notes-medical text-3xl text-teal-600"></i>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Gói khám tổng quát</h3>
            <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
              Đánh giá sức khỏe toàn diện với quy trình số hóa và hệ thống
              phòng khám đối tác đạt chuẩn.
            </p>
            <div
              className="w-full border-t border-dashed border-gray-200 mt-2 pt-6"
            >
              <Link
                to="/booking"
                className="text-teal-600 font-bold hover:text-teal-800 flex items-center transition-colors"
              >
                Đặt lịch ngay <i className="fas fa-arrow-right ml-2 text-sm"></i>
              </Link>
            </div>
          </div>

          {/* Gói khám chuyên khoa */}
          <div
            className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col items-start text-left group"
          >
            <div
              className="bg-teal-50 p-5 rounded-2xl mb-6 group-hover:bg-teal-100 transition-colors"
            >
              <i className="fas fa-stethoscope text-3xl text-teal-600"></i>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Gói khám chuyên khoa</h3>
            <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
              Kết nối nhanh với bác sĩ chuyên khoa phù hợp, áp dụng dữ liệu y
              tế chính xác trên nền tảng.
            </p>
            <div
              className="w-full border-t border-dashed border-gray-200 mt-2 pt-6"
            >
              <Link
                to="/booking"
                className="text-teal-600 font-bold hover:text-teal-800 flex items-center transition-colors"
              >
                Đặt lịch ngay <i className="fas fa-arrow-right ml-2 text-sm"></i>
              </Link>
            </div>
          </div>

          {/* Bác sĩ riêng */}
          <div
            className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col items-start text-left group"
          >
            <div
              className="bg-teal-50 p-5 rounded-2xl mb-6 group-hover:bg-teal-100 transition-colors"
            >
              <i className="fas fa-user-md text-3xl text-teal-600"></i>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Bác sĩ riêng</h3>
            <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
              Chọn bác sĩ phù hợp qua thuật toán gợi ý và theo dõi liên tục
              trên hồ sơ số cá nhân.
            </p>
            <div
              className="w-full border-t border-dashed border-gray-200 mt-2 pt-6"
            >
              <Link
                to="/booking"
                className="text-teal-600 font-bold hover:text-teal-800 flex items-center transition-colors"
              >
                Đặt lịch ngay <i className="fas fa-arrow-right ml-2 text-sm"></i>
              </Link>
            </div>
          </div>

          {/* Vaccine */}
          <div
            className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col items-start text-left group"
          >
            <div
              className="bg-teal-50 p-5 rounded-2xl mb-6 group-hover:bg-teal-100 transition-colors"
            >
              <i className="fas fa-syringe text-3xl text-teal-600"></i>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Vaccine</h3>
            <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
              Đặt lịch tiêm chủng an toàn, đồng bộ lịch sử vaccine ngay trên
              nền tảng quản lý sức khỏe.
            </p>
            <div
              className="w-full border-t border-dashed border-gray-200 mt-2 pt-6"
            >
              <Link
                to="/booking"
                className="text-teal-600 font-bold hover:text-teal-800 flex items-center transition-colors"
              >
                Đặt lịch ngay <i className="fas fa-arrow-right ml-2 text-sm"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
