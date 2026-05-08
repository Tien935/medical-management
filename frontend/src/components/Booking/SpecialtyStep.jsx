import React from 'react';

const specialties = [
  { id: 1, name: 'Nội tổng quát', icon: 'fa-user-nurse', color: 'bg-blue-50 text-blue-600' },
  { id: 2, name: 'Nhi khoa', icon: 'fa-baby', color: 'bg-pink-50 text-pink-600' },
  { id: 3, name: 'Tim mạch', icon: 'fa-heartbeat', color: 'bg-red-50 text-red-600' },
  { id: 4, name: 'Sản phụ khoa', icon: 'fa-female', color: 'bg-purple-50 text-purple-600' },
  { id: 5, name: 'Da liễu', icon: 'fa-hand-dots', color: 'bg-orange-50 text-orange-600' },
  { id: 6, name: 'Răng hàm mặt', icon: 'fa-tooth', color: 'bg-teal-50 text-teal-600' },
  { id: 7, name: 'Tai mũi họng', icon: 'fa-ear-listen', color: 'bg-indigo-50 text-indigo-600' },
  { id: 8, name: 'Cơ xương khớp', icon: 'fa-bone', color: 'bg-amber-50 text-amber-600' },
];

const SpecialtyStep = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fadeIn">
      {specialties.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:border-teal-500 transition-all duration-300 text-center flex flex-col items-center"
        >
          <div className={`w-20 h-20 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
            <i className={`fas ${item.icon} text-3xl`}></i>
          </div>
          <h3 className="font-bold text-lg text-slate-800 group-hover:text-teal-700">{item.name}</h3>
          <p className="text-slate-400 text-sm mt-2">Xem 12 bác sĩ</p>
        </button>
      ))}
    </div>
  );
};

export default SpecialtyStep;
