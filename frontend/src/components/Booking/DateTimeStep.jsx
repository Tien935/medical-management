import React, { useState } from 'react';

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

const DateTimeStep = ({ onSelect, onBack }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      full: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('vi-VN', { weekday: 'short' }),
      date: d.getDate()
    });
  }

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="mb-8 text-slate-500 hover:text-teal-600 flex items-center gap-2 font-semibold transition"
      >
        <i className="fas fa-arrow-left"></i> Quay lại
      </button>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Chọn ngày khám</h3>
        <div className="grid grid-cols-7 gap-4 mb-10">
          {dates.map((d) => (
            <button
              key={d.full}
              onClick={() => setSelectedDate(d.full)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center ${
                selectedDate === d.full 
                  ? 'bg-teal-600 border-teal-600 text-white shadow-lg scale-105' 
                  : 'bg-white border-slate-100 text-slate-600 hover:border-teal-200 hover:bg-teal-50'
              }`}
            >
              <span className="text-xs uppercase font-bold mb-1 opacity-80">{d.day}</span>
              <span className="text-2xl font-black">{d.date}</span>
            </button>
          ))}
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-6">Chọn giờ khám</h3>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-3 mb-10">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedTime(slot)}
              className={`py-3 rounded-xl border-2 transition-all duration-300 font-bold ${
                selectedTime === slot
                  ? 'bg-teal-600 border-teal-600 text-white shadow-md'
                  : 'bg-white border-slate-100 text-slate-600 hover:border-teal-200 hover:bg-teal-50'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>

        <button
          disabled={!selectedDate || !selectedTime}
          onClick={() => onSelect(selectedDate, selectedTime)}
          className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 ${
            selectedDate && selectedTime
              ? 'bg-teal-600 hover:bg-teal-700 text-white translate-y-0 opacity-100'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed translate-y-1 opacity-70'
          }`}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default DateTimeStep;
