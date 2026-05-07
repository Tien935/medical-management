import React, { useState, useEffect } from 'react';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    specialtyId: '', // For simplicity we might just hardcode options or fetch them
    degree: '',
    experience: '',
    imageUrl: '',
    description: ''
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/doctors');
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      }
    } catch (error) {
      console.error("Error fetching doctors", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa bác sĩ này?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/doctors/${id}`, { method: 'DELETE' });
        if (response.ok) {
          fetchDoctors();
        } else {
          alert("Xóa thất bại!");
        }
      } catch (error) {
        alert("Lỗi kết nối máy chủ");
      }
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialtyId: doctor.specialty ? doctor.specialty.id : '',
      degree: doctor.degree,
      experience: doctor.experience,
      imageUrl: doctor.imageUrl,
      description: doctor.description
    });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingDoctor(null);
    setFormData({
      name: '', specialtyId: '', degree: '', experience: '', imageUrl: '', description: ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingDoctor 
      ? `http://localhost:8080/api/doctors/${editingDoctor.id}` 
      : `http://localhost:8080/api/doctors`;
    const method = editingDoctor ? 'PUT' : 'POST';

    // Xây dựng payload an toàn
    const payload = {
      name: formData.name,
      degree: formData.degree,
      experience: formData.experience,
      imageUrl: formData.imageUrl,
      description: formData.description,
      specialty: formData.specialtyId ? { id: formData.specialtyId } : null
    };

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setShowModal(false);
        fetchDoctors();
        alert(editingDoctor ? "Cập nhật thành công" : "Thêm mới thành công");
      } else {
        alert("Có lỗi xảy ra");
      }
    } catch (error) {
      alert("Lỗi kết nối máy chủ");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Quản lý Bác sĩ</h2>
          <p className="text-slate-500 font-semibold mt-1">Tổng số: {doctors.length} bác sĩ</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition"
        >
          <i className="fas fa-plus mr-2"></i> Thêm Bác sĩ
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider">ID</th>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider">Bác sĩ</th>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider">Chuyên khoa</th>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider">Kinh nghiệm</th>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {doctors.map(doctor => (
                  <tr key={doctor.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-mono font-bold text-slate-500">#{doctor.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={doctor.imageUrl || '/frontend/assets/images/doctors/default.jpg'} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                        <div>
                          <p className="font-bold text-slate-800">{doctor.name}</p>
                          <p className="text-xs font-semibold text-slate-400">{doctor.degree}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-teal-600">
                      {doctor.specialty?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-600">
                      {doctor.experience || 'Chưa cập nhật'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleEdit(doctor)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition mr-2">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => handleDelete(doctor.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">
                {editingDoctor ? 'Chỉnh sửa Bác sĩ' : 'Thêm Bác sĩ mới'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="doctorForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1">Tên bác sĩ *</label>
                    <input required type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1">Bằng cấp *</label>
                    <input required type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none" value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1">ID Chuyên khoa</label>
                    <input type="number" placeholder="Ví dụ: 1, 2, 3" className="w-full p-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none" value={formData.specialtyId} onChange={e => setFormData({...formData, specialtyId: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1">Kinh nghiệm</label>
                    <input type="text" placeholder="Ví dụ: 10 năm" className="w-full p-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-1">URL Hình ảnh</label>
                  <input type="text" placeholder="/frontend/assets/images/doctors/..." className="w-full p-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-1">Mô tả chi tiết</label>
                  <textarea rows="3" className="w-full p-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-full font-bold text-slate-600 hover:bg-slate-200 transition">
                Hủy
              </button>
              <button form="doctorForm" type="submit" className="px-6 py-2.5 rounded-full font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-lg transition">
                Lưu lại
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageDoctors;
