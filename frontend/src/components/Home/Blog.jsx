import React from 'react';

const Blog = () => {
  return (
    <section id="blog" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
          className="flex flex-col md:flex-row justify-between items-end mb-16"
        >
          <div>
            <span className="text-teal-600 font-bold tracking-wider uppercase text-sm">Cẩm nang y tế</span>
            <h2 className="text-4xl font-bold mt-3 uppercase text-gray-800">Góc sức khỏe</h2>
          </div>
          <a
            href="#"
            className="mt-6 md:mt-0 inline-flex items-center px-8 py-3 border-2 border-teal-500 text-teal-600 font-bold rounded-full hover:bg-teal-500 hover:text-white transition-all duration-300"
          >
            Xem thêm bài viết <i className="fas fa-arrow-right ml-2 text-sm"></i>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Bài viết 1 */}
          <div
            className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group"
          >
            <div className="h-56 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                alt="Blog 1"
              />
            </div>
            <div className="p-8">
              <div
                className="flex items-center text-xs text-gray-400 mb-4 space-x-4 font-bold"
              >
                <span><i className="far fa-user mr-1 text-teal-500"></i> Admin</span>
                <span><i className="far fa-calendar mr-1 text-teal-500"></i> 04/05/2026</span>
              </div>
              <h3
                className="text-xl font-bold mb-6 line-clamp-2 hover:text-teal-600 transition cursor-pointer text-gray-800 leading-snug"
              >
                Khi nào nên đưa BỐ MẸ đi khám tổng quát?
              </h3>
              <a href="#" className="text-teal-600 font-bold text-sm inline-flex items-center group-hover:translate-x-1 transition-transform">
                Xem chi tiết <i className="fas fa-arrow-right ml-2 text-xs"></i>
              </a>
            </div>
          </div>

          {/* Bài viết 2 */}
          <div
            className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group"
          >
            <div className="h-56 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                alt="Blog 2"
              />
            </div>
            <div className="p-8">
              <div
                className="flex items-center text-xs text-gray-400 mb-4 space-x-4 font-bold"
              >
                <span><i className="far fa-user mr-1 text-teal-500"></i> Admin</span>
                <span><i className="far fa-calendar mr-1 text-teal-500"></i> 02/05/2026</span>
              </div>
              <h3
                className="text-xl font-bold mb-6 line-clamp-2 hover:text-teal-600 transition cursor-pointer text-gray-800 leading-snug"
              >
                Bạn có thể "Hack" sức khỏe của mình không?
              </h3>
              <a href="#" className="text-teal-600 font-bold text-sm inline-flex items-center group-hover:translate-x-1 transition-transform">
                Xem chi tiết <i className="fas fa-arrow-right ml-2 text-xs"></i>
              </a>
            </div>
          </div>

          {/* Bài viết 3 */}
          <div
            className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group"
          >
            <div className="h-56 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                alt="Blog 3"
              />
            </div>
            <div className="p-8">
              <div
                className="flex items-center text-xs text-gray-400 mb-4 space-x-4 font-bold"
              >
                <span><i className="far fa-user mr-1 text-teal-500"></i> Admin</span>
                <span><i className="far fa-calendar mr-1 text-teal-500"></i> 28/04/2026</span>
              </div>
              <h3
                className="text-xl font-bold mb-6 line-clamp-2 hover:text-teal-600 transition cursor-pointer text-gray-800 leading-snug"
              >
                Autophagy & Intermittent Fasting - Cơ chế tự làm sạch
              </h3>
              <a href="#" className="text-teal-600 font-bold text-sm inline-flex items-center group-hover:translate-x-1 transition-transform">
                Xem chi tiết <i className="fas fa-arrow-right ml-2 text-xs"></i>
              </a>
            </div>
          </div>

          {/* Bài viết 4 */}
          <div
            className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group"
          >
            <div className="h-56 overflow-hidden">
              <img
                src="/frontend/assets/images/TANTTV.png"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                alt="Blog 4"
              />
            </div>
            <div className="p-8">
              <div
                className="flex items-center text-xs text-gray-400 mb-4 space-x-4 font-bold"
              >
                <span><i className="far fa-user mr-1 text-teal-500"></i> Admin</span>
                <span><i className="far fa-calendar mr-1 text-teal-500"></i> 28/04/2026</span>
              </div>
              <h3
                className="text-xl font-bold mb-6 line-clamp-2 hover:text-teal-600 transition cursor-pointer text-gray-800 leading-snug"
              >
                Giới trẻ thời nay nghĩ sao về bệnh tật
              </h3>
              <a href="#" className="text-teal-600 font-bold text-sm inline-flex items-center group-hover:translate-x-1 transition-transform">
                Xem chi tiết <i className="fas fa-arrow-right ml-2 text-xs"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
