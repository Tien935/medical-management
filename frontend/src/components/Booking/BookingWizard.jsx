import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StepProgress from './StepProgress';
import SpecialtyStep from './SpecialtyStep';
import DoctorStep from './DoctorStep';
import DateTimeStep from './DateTimeStep';
import PatientInfoStep from './PatientInfoStep';

const BookingWizard = () => {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    specialty: null,
    doctor: null,
    date: null,
    time: null,
    patientInfo: {
      name: '',
      phone: '',
      email: '',
      reason: ''
    }
  });

  // Handle incoming state (e.g. from Home Page)
  useEffect(() => {
    if (location.state?.specialty) {
      setBookingData(prev => ({ ...prev, specialty: location.state.specialty }));
      setStep(2); // Jump to doctor selection
    }
    if (location.state?.doctor) {
      setBookingData(prev => ({ 
        ...prev, 
        specialty: location.state.specialty, 
        doctor: location.state.doctor 
      }));
      setStep(3); // Jump to date/time selection
    }
  }, [location.state]);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const updateData = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SpecialtyStep 
          onSelect={(specialty) => {
            updateData('specialty', specialty);
            nextStep();
          }} 
        />;
      case 2:
        return <DoctorStep 
          specialty={bookingData.specialty}
          onSelect={(doctor) => {
            updateData('doctor', doctor);
            nextStep();
          }}
          onBack={prevStep}
        />;
      case 3:
        return <DateTimeStep 
          onSelect={(date, time) => {
            updateData('date', date);
            updateData('time', time);
            nextStep();
          }}
          onBack={prevStep}
        />;
      case 4:
        return <PatientInfoStep 
          onSubmit={async (info) => {
            updateData('patientInfo', info);
            
            try {
              // Get current user if logged in
              const userStr = localStorage.getItem('user');
              const user = userStr ? JSON.parse(userStr) : null;
              const patientId = user ? user.id : null; // If null, backend should handle or require login

              if (!user) {
                alert("Vui lòng đăng nhập để đặt lịch.");
                window.location.href = "/login";
                return;
              }

              const payload = {
                patient: { id: patientId },
                doctor: { id: bookingData.doctor?.id },
                date: bookingData.date,
                time: bookingData.time + ':00', // Ensure HH:mm:ss format for LocalTime
                notes: `Bệnh nhân: ${info.name}\nSĐT: ${info.phone}\nLý do: ${info.reason}`,
                status: 'PENDING'
              };

              const response = await fetch("http://localhost:8081/api/appointments", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
              });

              if (response.ok) {
                const savedApt = await response.json();
                updateData('appointmentId', savedApt.id);
                setStep(5); // Success step
              } else {
                alert("Đã xảy ra lỗi khi đặt lịch. Vui lòng thử lại.");
              }
            } catch (error) {
              console.error("Booking error:", error);
              alert("Lỗi kết nối máy chủ.");
            }
          }}
          onBack={prevStep}
        />;
      case 5:
        return (
          <div className="text-center py-12 bg-white rounded-2xl shadow-xl border border-teal-100 max-w-2xl mx-auto mt-10">
            <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-check text-4xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Đặt lịch thành công!</h2>
            <p className="text-slate-600 mb-8 px-8">
              Cảm ơn bạn <strong>{bookingData.patientInfo.name}</strong>. Mã lịch hẹn của bạn là <span className="font-mono font-bold text-teal-600">{bookingData.appointmentId || 'PK-xxxx'}</span>. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.
            </p>
            <button 
              onClick={() => window.location.href = "/appointments"}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full transition shadow-lg"
            >
              Xem lịch hẹn của tôi
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Đặt Lịch Khám <span className="text-teal-600">Trực Tuyến</span>
        </h1>
        <p className="text-slate-500 text-lg">Chỉ mất 2 phút để đặt lịch với bác sĩ hàng đầu</p>
      </div>

      {step <= 4 && <StepProgress currentStep={step} />}
      
      <div className="mt-10 transition-all duration-500 ease-in-out">
        {renderStep()}
      </div>
    </div>
  );
};

export default BookingWizard;
