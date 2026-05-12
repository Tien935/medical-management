import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import MyAppointments from './pages/MyAppointments';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import DoctorsPage from './pages/DoctorsPage';
import ScrollToTop from './components/ScrollToTop';

// Admin Components
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageAppointments from './pages/admin/ManageAppointments';
import ManageDoctors from './pages/admin/ManageDoctors';
import ManageSpecialties from './pages/admin/ManageSpecialties';
import ManageUsers from './pages/admin/ManageUsers';
import ManagePatients from './pages/admin/ManagePatients';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRole="ADMIN">
            <AdminLayout>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/appointments" element={<ManageAppointments />} />
                <Route path="/doctors" element={<ManageDoctors />} />
                <Route path="/specialties" element={<ManageSpecialties />} />
                <Route path="/users" element={<ManageUsers />} />
                <Route path="/patients" element={<ManagePatients />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        } />

        {/* Public Routes */}
        <Route path="/*" element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/appointments" element={<MyAppointments />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/doctors" element={<DoctorsPage />} />
              {/* Fallback route */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;

