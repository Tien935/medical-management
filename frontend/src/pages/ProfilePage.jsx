import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [specialties, setSpecialties] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Nam',
    address: '',
    degree: '',
    experience: '',
    description: '',
    specialtyId: '',
    imageUrl: ''
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setFormData(prev => ({
        ...prev,
        fullName: parsedUser.fullName || parsedUser.username || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        dob: parsedUser.dob || '',
        gender: parsedUser.gender || '',
        address: parsedUser.address || ''
      }));

      if (parsedUser.role === 'DOCTOR') {
        fetchDoctorInfo(parsedUser.id);
        fetchSpecialties();
      }
    }
  }, []);

  const fetchDoctorInfo = async (userId) => {
    try {
      const res = await fetch(`http://localhost:8081/api/doctors/user/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setDoctorInfo(data);
        setFormData(prev => ({
          ...prev,
          degree: data.degree || '',
          experience: data.experience || '',
          description: data.description || '',
          specialtyId: data.specialty ? data.specialty.id : '',
          imageUrl: data.imageUrl || ''
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSpecialties = async () => {
    try {
      const res = await fetch(`http://localhost:8081/api/specialties`);
      if (res.ok) {
        const data = await res.json();
        setSpecialties(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    
    const updatedUser = { 
      ...user, 
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      dob: formData.dob,
      gender: formData.gender,
      address: formData.address
    };

    try {
      const userRes = await fetch(`http://localhost:8081/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          role: user.role
        })
      });

      if (userRes.ok) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);

        if (user.role === 'DOCTOR') {
          const doctorPayload = {
            name: formData.fullName,
            degree: formData.degree,
            experience: formData.experience,
            description: formData.description,
            imageUrl: formData.imageUrl,
            specialty: formData.specialtyId ? { id: formData.specialtyId } : null,
            user: { id: user.id }
          };
          
          if (doctorInfo && doctorInfo.id) {
            await fetch(`http://localhost:8081/api/doctors/${doctorInfo.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(doctorPayload)
            });
          } else {
            await fetch(`http://localhost:8081/api/doctors`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(doctorPayload)
            });
          }
        }

        alert('Đã cập nhật hồ sơ thành công!');
        window.location.reload(); 
      } else {
        alert('Có lỗi xảy ra khi cập nhật người dùng');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-bold">Vui lòng đăng nhập để xem hồ sơ.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-teal-600 h-32 relative">
          <div className="absolute -bottom-16 left-10">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-teal-50 flex items-center justify-center text-teal-600 text-5xl font-black shadow-lg">
              {formData.fullName.charAt(0)}
            </div>
          </div>
        </div>
        
        <div className="pt-20 px-10 pb-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-black text-gray-900">{formData.fullName}</h1>
              <p className="text-gray-500 font-semibold">{formData.email}</p>
            </div>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-teal-50 text-teal-600 font-bold py-2 px-6 rounded-full hover:bg-teal-100 transition"
              >
                Chỉnh sửa hồ sơ
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Họ và tên</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-70 transition-all font-semibold"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Số điện thoại</label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-70 transition-all font-semibold"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-70 transition-all font-semibold"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Ngày sinh</label>
                <input 
                  type="date" 
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-70 transition-all font-semibold"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Giới tính</label>
                <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-70 transition-all font-semibold"
                >
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Khác</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Địa chỉ</label>
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-70 transition-all font-semibold"
                />
              </div>
            </div>

            {user.role === 'DOCTOR' && (
              <div className="md:col-span-2 mt-4 pt-8 border-t border-gray-100">
                <h3 className="text-xl font-bold text-teal-600 mb-6">Thông tin Bác sĩ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Bằng cấp</label>
                      <input 
                        type="text" 
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-70 transition-all font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Kinh nghiệm</label>
                      <input 
                        type="text" 
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-70 transition-all font-semibold"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Chuyên khoa</label>
                      <select 
                        name="specialtyId"
                        value={formData.specialtyId}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-70 transition-all font-semibold"
                      >
                        <option value="">Chọn chuyên khoa</option>
                        {specialties.map(spec => (
                          <option key={spec.id} value={spec.id}>{spec.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">URL Hình ảnh</label>
                      <input 
                        type="text" 
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-70 transition-all font-semibold"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Mô tả chi tiết</label>
                    <textarea 
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows="3"
                      className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-70 transition-all font-semibold resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {isEditing && (
              <div className="md:col-span-2 flex gap-4 mt-6">
                <button 
                  type="submit"
                  className="bg-teal-600 text-white font-bold py-3 px-10 rounded-full hover:bg-teal-700 transition shadow-lg shadow-teal-100"
                >
                  Lưu thay đổi
                </button>
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-100 text-gray-600 font-bold py-3 px-10 rounded-full hover:bg-gray-200 transition"
                >
                  Hủy
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
