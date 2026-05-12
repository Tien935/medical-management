import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const DoctorLayout = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-teal-600">Bác sĩ Portal</h2>
          <p className="text-sm text-gray-500 mt-1">{user?.fullName}</p>
        </div>
        <nav className="p-4 space-y-2">
          <NavLink
            to="/doctor"
            end
            className={({ isActive }) =>
              `flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-50 text-teal-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <span>Lịch khám hôm nay</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm flex items-center justify-between p-4 md:px-6">
          <div className="flex items-center md:hidden">
            <h2 className="text-xl font-bold text-blue-600">Bác sĩ Portal</h2>
          </div>
          <div className="flex items-center space-x-4 ml-auto">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold">
                {user?.fullName?.charAt(0) || "D"}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {user?.fullName}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-600 transition-colors"
              title="Đăng xuất"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-gray-500 hover:text-blue-600 transition-colors"
              title="Trang chủ"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
            </button>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
