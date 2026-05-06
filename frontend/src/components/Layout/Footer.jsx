import { Link } from "react-router-dom";
import Tan from "../../assets/Tan.png";
import Tu from "../../assets/Tu.png";
import TANTTV from "../../assets/TANTTV.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 leading-relaxed">
          {/* Cột 1: Thông tin liên hệ */}
          <div>
            <span className="text-2xl font-extrabold text-white mb-6 inline-block">
              PhòngKhám<span className="text-teal-500">+</span>
            </span>
            <p className="mb-3 text-sm">
              <i className="fas fa-map-marker-alt text-teal-500 mr-3 w-4"></i>{" "}
              Số 298 Đ. Cầu Diễn, Nhổn, Tây Tựu, Hà Nội, Việt Nam
            </p>
            <p className="mb-3 text-sm">
              <i className="fas fa-phone-alt text-teal-500 mr-3 w-4"></i>{" "}
              Hotline: 1900 1234
            </p>
            <p className="mb-3 text-sm">
              <i className="fas fa-envelope text-teal-500 mr-3 w-4"></i> Email:
              tantientu@phongkham.com
            </p>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase">
              Liên kết nhanh
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-teal-400 transition flex items-center"
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-teal-600"></i>{" "}
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:text-teal-400 transition flex items-center"
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-teal-600"></i>{" "}
                  Đội ngũ y bác sĩ
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-teal-400 transition flex items-center"
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-teal-600"></i>{" "}
                  Bảng giá dịch vụ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-teal-400 transition flex items-center"
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-teal-600"></i>{" "}
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Đối tác & Mạng xã hội */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase">
              Kết nối với chúng tôi
            </h4>
            <div className="flex space-x-4 mb-8">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-50 hover:text-white transition"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-50 hover:text-white transition"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-50 hover:text-white transition"
              >
                <i className="fas fa-comment-dots"></i>
              </a>
            </div>
            <h4 className="text-white font-bold text-lg mb-4 uppercase">
              Đối tác
            </h4>
            <div className="flex space-x-3">
              <img src={Tan} alt="Partner Tan" className="h-8 object-contain" />
              <img src={Tu} alt="Partner Tu" className="h-8 object-contain" />
              <img
                src={TANTTV}
                alt="Partner TANTTV"
                className="h-8 object-contain"
              />
            </div>
          </div>

          {/* Cột 4: Bản đồ */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase">
              Google Map
            </h4>
            <div className="w-full h-40 bg-gray-700 rounded-lg overflow-hidden border border-gray-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.47378845151!2d105.73253187504464!3d21.05373098060188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345457e292d5bf%3A0x20ac91c94d74439a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1777967411990!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2026 Bản quyền thuộc về Phòng Khám. Tân - Tiền - Tú.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link to="/terms" className="hover:text-teal-400">
              Điều khoản
            </Link>
            <Link to="/privacy" className="hover:text-teal-400">
              Bảo mật
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
