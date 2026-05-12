import React, { useState, useEffect } from 'react';

const ManageSpecialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8081/api/specialties');
      if (response.ok) {
        const data = await response.json();
        setSpecialties(data);
      }
    } catch (error) {
      console.error("Error fetching specialties", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa chuyên khoa này?")) {
      try {
        const response = await fetch(`http://localhost:8081/api/specialties/${id}`, { method: 'DELETE' });
        if (response.ok) {
          fetchSpecialties();
        } else {
          alert("Xóa thất bại! Có thể có bác sĩ đang thuộc chuyên khoa này.");
        }
      } catch (error) {
        alert("Lỗi kết nối máy chủ");
      }
    }
  };

  const handleEdit = (specialty) => {
    setEditingSpecialty(specialty);
    setFormData({
      name: specialty.name,
      description: specialty.description,
      imageUrl: specialty.imageUrl
    });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingSpecialty(null);
    setFormData({ name: '', description: '', imageUrl: '' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingSpecialty 
      ? `http://localhost:8081/api/specialties/${editingSpecialty.id}` 
      : `http://localhost:8081/api/specialties`;
    const method = editingSpecialty ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setShowModal(false);
        fetchSpecialties();
        alert(editingSpecialty ? "Cập nhật thành công" : "Thêm mới thành công");
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
          <h2 className="text-2xl font-black text-slate-800">Quản lý Chuyên khoa</h2>
          <p className="text-slate-500 font-semibold mt-1">Tổng số: {specialties.length} chuyên khoa</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition"
        >
          <i className="fas fa-plus mr-2"></i> Thêm Chuyên khoa
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-10 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
          </div>
        ) : (
          specialties.map(specialty => (
            <div key={specialty.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={specialty.imageUrl || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80'} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={specialty.name}
                />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(specialty)} className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur shadow-lg text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => handleDelete(specialty.id)} className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur shadow-lg text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-slate-800 mb-2">{specialty.name}</h3>
                <p className="text-slate-500 text-sm font-semibold line-clamp-3 mb-4">{specialty.description}</p>
                <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>ID: #{specialty.id}</span>
                  <span className="text-teal-600 bg-teal-50 px-3 py-1 rounded-full">Hoạt động</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">
                {editingSpecialty ? 'Chỉnh sửa Chuyên khoa' : 'Thêm Chuyên khoa mới'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">Tên chuyên khoa *</label>
                <input required type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">URL Hình ảnh</label>
                <input type="text" placeholder="https://..." className="w-full p-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">Mô tả</label>
                <textarea rows="4" required className="w-full p-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-full font-bold text-slate-600 hover:bg-slate-100 transition">
                  Hủy
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-full font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-lg transition">
                  Lưu lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSpecialties;
