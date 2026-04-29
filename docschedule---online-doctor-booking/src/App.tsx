/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DoctorsList from './pages/DoctorsList';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

export default function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('docschedule_admin_auth') === 'true';
  });

  const handleAdminLogin = () => {
    localStorage.setItem('docschedule_admin_auth', 'true');
    setIsAdminLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              isAdminLoggedIn ? (
                <AdminDashboard />
              ) : (
                <AdminLogin onLogin={handleAdminLogin} />
              )
            } 
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
