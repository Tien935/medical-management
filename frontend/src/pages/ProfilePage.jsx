import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Nam',
    address: ''
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setFormData({
        ...formData,
        fullName: parsedUser.fullName || parsedUser.username || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        dob: parsedUser.dob || '',
        gender: parsedUser.gender || '',
        address: parsedUser.address || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Cập nhật localStorage hoặc gọi API
    const updatedUser = { 
      ...user, 
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      dob: formData.dob,
      gender: formData.gender,
      address: formData.address
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert('Đã cập nhật hồ sơ thành công!');
    window.location.reload(); // Để cập nhật Header
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
