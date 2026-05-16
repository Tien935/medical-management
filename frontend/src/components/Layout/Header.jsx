import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Dữ liệu người dùng
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isActive = (path, hash = "") => {
    if (hash) {
      return location.hash === hash;
    }
    return location.pathname === path && !location.hash;
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const mockDoctors = [
    {
      id: 1,
      name: "BS. Nguyễn Văn An",
      specialty: "Nội tổng quát",
      degree: "Thạc sĩ, Bác sĩ",
    },
    {
      id: 2,
      name: "ThS.BS. Trần Thị Bình",
      specialty: "Nhi khoa",
      degree: "Thạc sĩ",
    },
    {
      id: 3,
      name: "BSCKII. Lê Văn Cường",
      specialty: "Tim mạch",
      degree: "Bác sĩ chuyên khoa II",
    },
    {
      id: 4,
      name: "BS. Phạm Minh Đức",
      specialty: "Sản phụ khoa",
      degree: "Bác sĩ chuyên khoa I",
    },
    { id: 5, name: "BS. Hoàng Thu Hà", specialty: "Da liễu", degree: "Bác sĩ" },
    {
      id: 6,
      name: "ThS.BS. Đỗ Kim Liên",
      specialty: "Răng Hàm Mặt",
      degree: "Thạc sĩ",
    },
  ];

  const filteredDoctors = searchQuery.trim()
    ? mockDoctors.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.specialty.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const handleSearchSelect = (doctor) => {
    setShowSearchResults(false);
    setSearchQuery("");
    navigate(`/doctors?search=${encodeURIComponent(doctor.name)}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchResults(false);
      navigate(`/doctors?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center h-20 gap-4">
        {/* Trái: Logo */}
        <Link
          to="/"
          className="logo flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <img
            src={Logo}
            alt="Logo"
            className="h-10 w-auto object-contain rounded-md"
          />
          <span className="text-2xl font-extrabold text-teal-600 whitespace-nowrap">
            PhòngKhám
            <span className="text-gray-800" style={{ color: "red" }}>
              +
            </span>
          </span>
        </Link>
        {/* Giữa: Menu */}
        <nav className="hidden md:flex space-x-4 lg:space-x-6 text-gray-700 font-semibold text-sm lg:text-base">
          <Link
            to="/"
            className={`hover:text-teal-600 transition whitespace-nowrap ${isActive("/") ? "text-teal-600" : ""}`}
          >
            Trang chủ
          </Link>
          <a
            href="/#services"
            className={`hover:text-teal-600 transition whitespace-nowrap ${isActive("/", "#services") ? "text-teal-600" : ""}`}
          >
            Dịch vụ
          </a>
          <a
            href="/#process"
            className={`hover:text-teal-600 transition whitespace-nowrap ${isActive("/", "#process") ? "text-teal-600" : ""}`}
          >
            Quy trình
          </a>
          <Link
            to="/doctors"
            className={`hover:text-teal-600 transition whitespace-nowrap ${isActive("/doctors") ? "text-teal-600" : ""}`}
          >
            Bác sĩ
          </Link>
          <Link
            to="/appointments"
            className={`hover:text-teal-600 transition whitespace-nowrap ${isActive("/appointments") ? "text-teal-600" : ""}`}
          >
            Lịch hẹn
          </Link>
        </nav>
        {/* Phải: Search & Call to Action */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <form
            onSubmit={handleSearchSubmit}
            className="search-bar hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 relative"
          >
            <input
              type="text"
              placeholder="Tìm kiếm bác sĩ..."
              className="bg-transparent outline-none text-sm w-40 focus:w-48 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
            />
            <button type="submit">
              <i className="fas fa-search text-gray-500 hover:text-teal-600 transition"></i>
            </button>

            {showSearchResults && filteredDoctors.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[60]">
                {filteredDoctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    onClick={() => handleSearchSelect(doctor)}
                    className="w-full text-left px-5 py-4 hover:bg-teal-50 transition flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-teal-100 group-hover:text-teal-600">
                      <i className="fas fa-user-md"></i>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">
                        {doctor.name}
                      </p>
                      <p className="text-xs text-gray-400 font-bold">
                        {doctor.specialty}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </form>

          <Link
            to="/booking"
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition transform hover:scale-105 whitespace-nowrap text-sm lg:text-base"
          >
            Đặt Lịch Khám
          </Link>

          {user ? (
            <div className="flex items-center gap-3 bg-gray-50 p-1.5 pr-4 rounded-full border border-gray-100 hover:shadow-md transition cursor-pointer group relative">
              <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
                {(user.fullName || user.username || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>
              <span className="text-sm font-bold text-gray-700 group-hover:text-teal-600 transition truncate max-w-[100px]">
                {user.fullName || user.username}
              </span>

              {/* Dropdown menu giả lập */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link
                  to="/profile"
                  className="block px-5 py-3 text-sm text-gray-700 hover:bg-teal-50 font-semibold"
                >
                  <i className="far fa-id-card mr-2 text-teal-600"></i> Hồ sơ của tôi
                </Link>

                {user.role === "DOCTOR" && (
                  <Link
                    to="/doctor"
                    className="block px-5 py-3 text-sm text-gray-700 hover:bg-teal-50 font-semibold"
                  >
                    <i className="fas fa-stethoscope mr-2 text-teal-600"></i>{" "}
                    Portal Bác sĩ
                  </Link>
                )}

                {user.role === "ADMIN" && (
                  <Link
                    to="/admin"
                    className="block px-5 py-3 text-sm text-gray-700 hover:bg-teal-50 font-semibold"
                  >
                    <i className="fas fa-cog mr-2 text-teal-600"></i> Quản trị
                    viên
                  </Link>
                )}

                <div className="border-t border-gray-50"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-5 py-3 text-sm text-red-600 hover:bg-red-50 font-bold transition"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
            >
              <i className="far fa-user text-gray-600"></i>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
