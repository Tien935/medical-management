import React from 'react';

const doctors = [
  { id: 1, name: 'BS. Nguyễn Văn An', role: 'Trưởng khoa', rating: 4.9, reviews: 120, image: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'ThS.BS. Trần Thị Bình', role: 'Phó khoa', rating: 4.8, reviews: 95, image: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'BSCKII. Lê Văn Cường', role: 'Bác sĩ chuyên khoa', rating: 5.0, reviews: 210, image: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'BS. Phạm Minh Đức', role: 'Bác sĩ điều trị', rating: 4.7, reviews: 78, image: 'https://i.pravatar.cc/150?u=4' },
];

const DoctorStep = ({ specialty, onSelect, onBack }) => {
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
                  <i className="fas fa-star text-yellow-400"></i> {doctor.rating}
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
    </div>
  );
};

export default DoctorStep;
