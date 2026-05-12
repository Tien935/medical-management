import React, { useState, useEffect } from 'react';

const iconColorMap = {
  1: { icon: 'fa-user-nurse', color: 'bg-blue-50 text-blue-600' },
  2: { icon: 'fa-baby', color: 'bg-pink-50 text-pink-600' },
  3: { icon: 'fa-heartbeat', color: 'bg-red-50 text-red-600' },
  4: { icon: 'fa-female', color: 'bg-purple-50 text-purple-600' },
  5: { icon: 'fa-hand-dots', color: 'bg-orange-50 text-orange-600' },
  6: { icon: 'fa-tooth', color: 'bg-teal-50 text-teal-600' },
  7: { icon: 'fa-ear-listen', color: 'bg-indigo-50 text-indigo-600' },
  8: { icon: 'fa-bone', color: 'bg-amber-50 text-amber-600' },
};

const SpecialtyStep = ({ onSelect }) => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8081/api/specialties')
      .then(res => res.json())
      .then(data => {
        const mappedData = data.map(item => ({
          ...item,
          icon: iconColorMap[item.id]?.icon || 'fa-stethoscope',
          color: iconColorMap[item.id]?.color || 'bg-slate-50 text-slate-600'
        }));
        setSpecialties(mappedData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching specialties:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

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
          <p className="text-slate-400 text-sm mt-2">{item.description || 'Khám chuyên khoa'}</p>
        </button>
      ))}
    </div>
  );
};

export default SpecialtyStep;
