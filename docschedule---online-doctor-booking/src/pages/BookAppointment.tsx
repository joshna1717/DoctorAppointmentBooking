/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Phone, Mail, Stethoscope, AlertCircle, CheckCircle2, HeartPulse } from 'lucide-react';
import { storage } from '../lib/storage';
import { Doctor, Appointment } from '../types';
import { format } from 'date-fns';
import { motion } from 'motion/react';

export default function BookAppointment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingStatus, setBookingStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    phone: '',
    email: '',
    doctorId: '',
    date: '',
    timeSlot: '',
    symptoms: '',
  });

  useEffect(() => {
    const docs = storage.getDoctors();
    setDoctors(docs);

    const docId = searchParams.get('doctorId');
    if (docId) {
      const doc = docs.find(d => d.id === docId);
      if (doc) {
        setSelectedDoctor(doc);
        setFormData(prev => ({ ...prev, doctorId: docId }));
      }
    }
  }, [searchParams]);

  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const docId = e.target.value;
    const doc = doctors.find(d => d.id === docId) || null;
    setSelectedDoctor(doc);
    setFormData(prev => ({ ...prev, doctorId: docId, timeSlot: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus(null);
    try {
      if (!selectedDoctor) throw new Error('Specify medical professional');
      const newAppointment: Appointment = {
        id: Math.random().toString(36).substr(2, 9),
        patientName: formData.patientName,
        age: parseInt(formData.age),
        phone: formData.phone,
        email: formData.email,
        doctorId: formData.doctorId,
        doctorName: selectedDoctor.name,
        date: formData.date,
        timeSlot: formData.timeSlot,
        symptoms: formData.symptoms,
        status: 'Booked',
        createdAt: new Date().toISOString(),
      };
      storage.addAppointment(newAppointment);
      setBookingStatus({ type: 'success', message: 'Relational logic confirmed. Redirecting...' });
      setTimeout(() => navigate('/my-appointments'), 2000);
    } catch (err) {
      setBookingStatus({ type: 'error', message: err instanceof Error ? err.message : 'System rejection' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-16 pb-32">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[4rem] p-12 lg:p-20 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col lg:grid lg:grid-cols-12 gap-16"
      >
        <div className="lg:col-span-4 lg:border-r border-slate-100 lg:pr-16 text-center lg:text-left">
          <div className="inline-block p-5 bg-blue-50 rounded-[2rem] mb-10 text-blue-600 shadow-xl shadow-blue-100">
            <HeartPulse className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-[1.1]">Reservation Matrix</h1>
          <p className="text-slate-400 font-medium leading-relaxed italic border-l-2 border-blue-200 pl-6 mb-12">
            "We believe the best medical experiences start with clean digital organization."
          </p>

          {selectedDoctor && (
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 mt-10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Confirmed Consultant</p>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md">
                  <img src={selectedDoctor.image} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 uppercase tracking-tight">{selectedDoctor.name}</p>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{selectedDoctor.specialization}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-8 flex flex-col justify-center">
          {bookingStatus && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-10 p-5 rounded-[2rem] flex items-center space-x-4 border ${
              bookingStatus.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
            }`}>
              {bookingStatus.type === 'success' ? <CheckCircle2 className="w-6 h-6 shrink-0" /> : <AlertCircle className="w-6 h-6 shrink-0" />}
              <span className="font-black text-xs uppercase tracking-widest leading-relaxed">{bookingStatus.message}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4">Patient Intelligence</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 pl-1">Full Legal Name</label>
                    <div className="relative">
                      <input required type="text" value={formData.patientName} onChange={e => setFormData({ ...formData, patientName: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-900 outline-none focus:ring-4 focus:ring-blue-100 transition-all pl-14" placeholder="PATIENT NAME" />
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 pl-1">Age</label>
                      <input required type="number" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-900 outline-none focus:ring-4 focus:ring-blue-100 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 pl-1">Protocol Phone</label>
                      <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-900 outline-none focus:ring-4 focus:ring-blue-100 transition-all" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4">Appointment Node</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 pl-1">Medical Specialist</label>
                    <select required value={formData.doctorId} onChange={handleDoctorChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-slate-900 outline-none focus:ring-4 focus:ring-blue-100 transition-all appearance-none uppercase tracking-tight">
                      <option value="">Select Resource</option>
                      {doctors.map(d => <option key={d.id} value={d.id}>{d.name.toUpperCase()}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 pl-1">Target Date</label>
                      <input required type="date" min={format(new Date(), 'yyyy-MM-dd')} value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-[10px] font-black text-slate-900 outline-none focus:ring-4 focus:ring-blue-100 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 pl-1">Slot Selection</label>
                      <select required disabled={!selectedDoctor} value={formData.timeSlot} onChange={e => setFormData({ ...formData, timeSlot: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-[10px] font-black text-slate-900 outline-none focus:ring-4 focus:ring-blue-100 transition-all appearance-none disabled:opacity-30 uppercase">
                        <option value="">TIME</option>
                        {selectedDoctor?.timings.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 pl-1">Diagnostic Context / Symptoms</label>
              <textarea value={formData.symptoms} onChange={e => setFormData({ ...formData, symptoms: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] px-8 py-6 text-sm font-medium text-slate-700 outline-none focus:ring-4 focus:ring-blue-100 transition-all h-36 resize-none italic" placeholder="Provide medical context..."></textarea>
            </div>

            <div className="pt-6">
              <button type="submit" className="w-full py-6 bg-slate-900 text-white font-black text-sm uppercase tracking-[0.3em] rounded-[2rem] transition-all shadow-2xl shadow-slate-300 hover:bg-blue-600 hover:shadow-blue-200 active:scale-95">
                Execute Booking
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
