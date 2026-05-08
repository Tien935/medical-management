import React from 'react';

const StepProgress = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Chuyên khoa', icon: 'fa-stethoscope' },
    { id: 2, label: 'Bác sĩ', icon: 'fa-user-md' },
    { id: 3, label: 'Thời gian', icon: 'fa-calendar-alt' },
    { id: 4, label: 'Xác nhận', icon: 'fa-id-card' }
  ];

  return (
    <div className="flex items-center justify-between relative max-w-3xl mx-auto">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
      <div 
        className="absolute top-1/2 left-0 h-1 bg-teal-500 -translate-y-1/2 z-0 transition-all duration-500"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      ></div>

      {steps.map((step) => (
        <div key={step.id} className="relative z-10 flex flex-col items-center">
          <div 
            className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
              currentStep >= step.id 
                ? 'bg-teal-600 border-white text-white shadow-lg' 
                : 'bg-white border-slate-200 text-slate-400'
            }`}
          >
            <i className={`fas ${step.icon} text-lg`}></i>
          </div>
          <span className={`mt-3 text-sm font-bold ${
            currentStep >= step.id ? 'text-teal-700' : 'text-slate-400'
          }`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StepProgress;
