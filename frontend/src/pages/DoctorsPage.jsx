import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DoctorsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("Tất cả");

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const specialties = [
    "Tất cả",
    "Nội tổng quát",
    "Nhi khoa",
    "Tim mạch",
    "Sản phụ khoa",
    "Da liễu",
    "Răng Hàm Mặt",
  ];

  useEffect(() => {
    fetchDoctors();
  }, [selectedSpecialty]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:8080/api/doctors`;
      if (selectedSpecialty !== "Tất cả") {
        url += `?specialty=${encodeURIComponent(selectedSpecialty)}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((doctor) => {
    return doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleBooking = (doctor) => {
    navigate("/booking", {
      state: { doctor, specialty: { name: doctor.specialty?.name || '' } },
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-teal-600 py-20 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight">
            Đội ngũ y bác sĩ
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto font-medium">
            Hội tụ những chuyên gia y tế hàng đầu, tận tâm và giàu kinh nghiệm
            để chăm sóc sức khỏe cho bạn và gia đình.
          </p>
        </div>
      </section>
      
      {/* Filter Section */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 flex flex-col md:flex-row gap-6">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Tìm kiếm bác sĩ theo tên..."
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-semibold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
          <div className="md:w-64">
            <select
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-semibold text-gray-600 cursor-pointer"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="container mx-auto px-4 mt-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-500 font-semibold">Đang tải danh sách bác sĩ...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group flex flex-col"
                >
                  <div className="h-72 overflow-hidden relative">
                    <img
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                      <span className="text-teal-600 font-black text-xs uppercase tracking-wider">
                        {doctor.specialty?.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex-grow">
                    <p className="text-gray-400 font-black text-xs uppercase tracking-widest mb-2">
                      {doctor.degree}
                    </p>
                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-teal-600 transition">
                      {doctor.name}
                    </h3>
                    <div className="space-y-3 mb-8">
                      <p className="text-gray-500 flex items-center text-sm font-semibold">
                        <i className="fas fa-award text-teal-500 mr-3 w-4"></i>{" "}
                        {doctor.experience}
                      </p>
                      <p className="text-gray-500 flex items-center text-sm font-semibold">
                        <i className="fas fa-check-circle text-teal-500 mr-3 w-4"></i>{" "}
                        Lịch khám: Thứ 2 - Thứ 7
                      </p>
                    </div>
                    <button
                      onClick={() => handleBooking(doctor)}
                      className="w-full bg-teal-50 text-teal-600 font-black py-4 rounded-2xl hover:bg-teal-600 hover:text-white transition-all transform group-hover:scale-[1.02] shadow-sm shadow-teal-100"
                    >
                      ĐẶT LỊCH NGAY
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-user-md text-gray-300 text-3xl"></i>
                </div>
                <p className="text-gray-400 font-bold text-xl">
                  Không tìm thấy bác sĩ nào phù hợp.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;
