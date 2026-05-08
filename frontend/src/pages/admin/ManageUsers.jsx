import React, { useState, useEffect } from 'react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'PATIENT'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8081/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try {
        const response = await fetch(`http://localhost:8081/api/users/${id}`, { method: 'DELETE' });
        if (response.ok) {
          fetchUsers();
        } else {
          alert("Xóa thất bại!");
        }
      } catch (error) {
        alert("Lỗi kết nối máy chủ");
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setShowModal(false);
        fetchUsers();
        alert("Cập nhật thành công");
      } else {
        alert("Có lỗi xảy ra");
      }
    } catch (error) {
      alert("Lỗi kết nối máy chủ");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Quản lý Người dùng</h2>
          <p className="text-slate-500 font-semibold mt-1">Danh sách bệnh nhân và nhân viên hệ thống</p>
        </div>
        <div className="flex gap-2">
           <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-2xl font-bold text-sm">
             Tổng: {users.length}
           </div>
        </div>
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
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider">Người dùng</th>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider">Liên hệ</th>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider">Vai trò</th>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-wider text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50 transition group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xl overflow-hidden">
                          {user.avatarUrl ? (
                            <img src={user.avatarUrl} className="w-full h-full object-cover" alt="" />
                          ) : user.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{user.fullName}</p>
                          <p className="text-xs font-bold text-slate-400">@{user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                      <div><i className="far fa-envelope mr-2 text-teal-500"></i> {user.email}</div>
                      <div className="mt-1"><i className="fas fa-phone-alt mr-2 text-teal-500"></i> {user.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                        user.role === 'ADMIN' ? 'bg-purple-100 text-purple-600' : 
                        user.role === 'DOCTOR' ? 'bg-blue-100 text-blue-600' : 'bg-teal-100 text-teal-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleEdit(user)} className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 hover:bg-teal-600 hover:text-white transition shadow-sm">
                        <i className="fas fa-user-edit"></i>
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 hover:bg-red-600 hover:text-white transition ml-2 shadow-sm">
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
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Cập nhật Người dùng</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">Họ tên *</label>
                <input required type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-1">Email *</label>
                  <input required type="email" className="w-full p-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-1">Số điện thoại</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">Vai trò</label>
                <select className="w-full p-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none bg-white font-bold" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  <option value="PATIENT">PATIENT (Bệnh nhân)</option>
                  <option value="DOCTOR">DOCTOR (Bác sĩ)</option>
                  <option value="ADMIN">ADMIN (Quản trị)</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-full font-bold text-slate-600 hover:bg-slate-100 transition">
                  Hủy
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-full font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-lg transition">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
