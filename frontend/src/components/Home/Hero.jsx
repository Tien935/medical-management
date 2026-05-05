import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section
      className="w-full relative h-[400px] md:h-[600px] bg-gray-200 flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-transparent z-10"
      ></div>
      <img
        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        alt="Banner Y Tế"
        className="w-full h-full object-cover absolute inset-0"
      />
      <div className="container mx-auto px-4 relative z-20 text-white">
        <h1
          className="text-4xl md:text-6xl font-bold mb-6 max-w-2xl leading-tight"
        >
          Chăm sóc sức khỏe toàn diện cho gia đình bạn
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-xl opacity-90">
          Đặt lịch khám nhanh chóng, tiếp cận đội ngũ y bác sĩ hàng đầu và
          dịch vụ y tế chuẩn quốc tế.
        </p>
        <div className="flex gap-4">
          <Link
            to="/booking"
            className="bg-white text-teal-700 font-bold py-3 px-10 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            Đặt lịch ngay
          </Link>
          <button
            className="bg-transparent border-2 border-white text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-white/10 transition"
          >
            Tìm hiểu thêm
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
