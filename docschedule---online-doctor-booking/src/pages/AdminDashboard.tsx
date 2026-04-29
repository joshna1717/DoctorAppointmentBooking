/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Stethoscope, 
  Plus, 
  Trash2, 
  Search, 
  TrendingUp, 
  Activity, 
  MoreVertical,
  X,
  CheckCircle2,
  LogOut
} from 'lucide-react';
import { storage } from '../lib/storage';
import { Doctor, Appointment } from '../types';
import { SPECIALIZATIONS, DAYS_OF_WEEK } from '../constants';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'doctors' | 'appointments'>('overview');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [newDoctor, setNewDoctor] = useState<Partial<Doctor>>({
    name: '',
    specialization: '',
    experience: 0,
    fee: 0,
    timings: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
    days: [],
    about: '',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
  });

  useEffect(() => {
    setDoctors(storage.getDoctors());
    setAppointments(storage.getAppointments());
  }, []);

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    const doctor = {
      ...newDoctor,
      id: Math.random().toString(36).substr(2, 9),
    } as Doctor;
    storage.addDoctor(doctor);
    setDoctors(storage.getDoctors());
    setShowAddDoctor(false);
    setNewDoctor({
      name: '',
      specialization: '',
      experience: 0,
      fee: 0,
      timings: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
      days: [],
      about: '',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    });
  };

  const handleDeleteDoctor = (id: string) => {
    if (confirm('Delete this doctor? All their information will be removed.')) {
      storage.deleteDoctor(id);
      setDoctors(storage.getDoctors());
    }
  };

  const toggleDay = (day: string) => {
    const currentDays = newDoctor.days || [];
    if (currentDays.includes(day)) {
      setNewDoctor({ ...newDoctor, days: currentDays.filter(d => d !== day) });
    } else {
      setNewDoctor({ ...newDoctor, days: [...currentDays, day] });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('docschedule_admin_auth');
    window.location.href = '/admin'; // Force reload to trigger auth check in App.tsx
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-500">System control and analytics panel.</p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
            {[
              { id: 'overview', icon: Activity, label: 'Overview' },
              { id: 'doctors', icon: Stethoscope, label: 'Doctors' },
              { id: 'appointments', icon: Calendar, label: 'Appointments' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center space-x-2 transition-all ${
                  activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          <button 
            onClick={handleLogout}
            className="p-3 text-slate-400 hover:text-red-600 transition-colors bg-white rounded-xl border border-slate-200 shadow-sm"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-md">Real-time</span>
            </div>
            <div className="text-4xl font-black text-slate-900 mb-1">{appointments.length}</div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Appointments</div>
            <div className="mt-6 flex items-center text-green-500 text-xs font-bold">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12% from last week</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-green-50 p-3 rounded-2xl text-green-600">
                <Stethoscope className="w-6 h-6" />
              </div>
            </div>
            <div className="text-4xl font-black text-slate-900 mb-1">{doctors.length}</div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Active Doctors</div>
            <div className="mt-8">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-400 uppercase tracking-widest">Growth Target</span>
                <span className="text-slate-900 font-bold">85%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[85%] rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-purple-50 p-3 rounded-2xl text-purple-600">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <div className="text-4xl font-black text-slate-900 mb-1">${doctors.reduce((acc, d) => acc + (appointments.filter(a => a.doctorId === d.id).length * d.fee), 0)}</div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Projected Revenue</div>
            <div className="mt-6 text-slate-400 text-xs">Based on all current bookings.</div>
          </div>
        </div>
      )}

      {activeTab === 'doctors' && (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-xl tracking-tight">Staff Management</h3>
            <button 
              onClick={() => setShowAddDoctor(true)}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Professional
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Doctor</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Specialization</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Fee</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {doctors.map(doc => (
                  <tr key={doc.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <img src={doc.image} className="w-10 h-10 rounded-full object-cover shadow-sm" referrerPolicy="no-referrer" />
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{doc.name}</div>
                          <div className="text-xs text-slate-400">{doc.experience} Years of experience</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-widest">{doc.specialization}</span>
                    </td>
                    <td className="px-8 py-6 font-bold text-slate-900">${doc.fee}</td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => handleDeleteDoctor(doc.id)}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'appointments' && (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50">
            <h3 className="font-bold text-xl tracking-tight">System Appointments</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Patient</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Doctor</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Schedule</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {appointments.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900">{app.patientName}</div>
                      <div className="text-xs text-slate-400">{app.email}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-700 uppercase tracking-tight">{app.doctorName}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-semibold">{app.date}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">{app.timeSlot}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        app.status === 'Booked' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {showAddDoctor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-10 overflow-y-auto max-h-[90vh] shadow-2xl relative">
            <button 
              onClick={() => setShowAddDoctor(false)}
              className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-8 tracking-tight">Onboard New Specialist</h2>
            <form onSubmit={handleAddDoctor} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Doctor Name</label>
                  <input
                    required
                    type="text"
                    value={newDoctor.name}
                    onChange={e => setNewDoctor({ ...newDoctor, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all uppercase tracking-tight font-bold"
                    placeholder="Dr. John Smith"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Specialization</label>
                  <select
                    required
                    value={newDoctor.specialization}
                    onChange={e => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none uppercase font-bold"
                  >
                    <option value="">Select Specialization</option>
                    {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Experience (Years)</label>
                  <input
                    required
                    type="number"
                    value={newDoctor.experience}
                    onChange={e => setNewDoctor({ ...newDoctor, experience: parseInt(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Consultation Fee ($)</label>
                  <input
                    required
                    type="number"
                    value={newDoctor.fee}
                    onChange={e => setNewDoctor({ ...newDoctor, fee: parseInt(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Availability (Days)</label>
                <div className="flex flex-wrap gap-2">
                  {DAYS_OF_WEEK.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        newDoctor.days?.includes(day)
                          ? 'bg-slate-900 border-slate-900 text-white'
                          : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">About Professional</label>
                <textarea
                  required
                  value={newDoctor.about}
                  onChange={e => setNewDoctor({ ...newDoctor, about: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-24 resize-none"
                  placeholder="Professional background and expertise..."
                ></textarea>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center text-lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add to Registry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
