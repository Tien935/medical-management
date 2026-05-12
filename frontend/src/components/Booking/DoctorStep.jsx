import React, { useState, useEffect } from 'react';

const DoctorStep = ({ specialty, onSelect, onBack }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!specialty?.name) return;
    
    fetch(`http://localhost:8081/api/doctors?specialty=${encodeURIComponent(specialty.name)}`)
      .then(res => res.json())
      .then(data => {
        // Map backend data to UI format
        const mappedDoctors = data.map(doc => ({
          id: doc.id,
          name: doc.name,
          role: doc.degree || 'Bác sĩ',
          rating: 4.8 + (Math.random() * 0.2), // Mock rating between 4.8 and 5.0
          reviews: Math.floor(Math.random() * 200) + 50, // Mock reviews
          image: doc.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=0D8ABC&color=fff`
        }));
        setDoctors(mappedDoctors);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching doctors:', err);
        setLoading(false);
      });
  }, [specialty]);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-8">
        <button 
          onClick={onBack}
          className="mr-4 text-slate-500 hover:text-teal-600 flex items-center gap-2 font-semibold transition"
        >
          <i className="fas fa-arrow-left"></i> Quay lại
        </button>
        <h2 className="text-xl font-bold text-slate-800">
          Chuyên khoa: <span className="text-teal-600">{specialty?.name}</span>
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-100">
          <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-user-md text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Chưa có bác sĩ</h3>
          <p className="text-slate-500">Hiện tại chưa có bác sĩ nào thuộc chuyên khoa này.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <div 
              key={doctor.id}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex gap-6 items-center"
            >
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-teal-50"
              />
              <div className="flex-grow">
                <h3 className="font-bold text-xl text-slate-900 mb-1">{doctor.name}</h3>
                <p className="text-teal-600 font-semibold mb-2">{doctor.role}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <i className="fas fa-star text-yellow-400"></i> {doctor.rating.toFixed(1)}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fas fa-comment-dots text-slate-400"></i> {doctor.reviews} đánh giá
                  </span>
                </div>
              </div>
              <button 
                onClick={() => onSelect(doctor)}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-2xl transition shadow-md whitespace-nowrap"
              >
                Chọn bác sĩ
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorStep;
