/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Stethoscope, AlertCircle, Trash2, CheckCircle2, Search, ArrowRight } from 'lucide-react';
import { storage } from '../lib/storage';
import { Appointment } from '../types';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setAppointments(storage.getAppointments().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }, []);

  const handleCancel = (id: string) => {
    if (confirm('Cancel this medical reservation?')) {
      storage.cancelAppointment(id);
      setAppointments(storage.getAppointments().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
  };

  const filteredAppointments = appointments.filter(app => 
    app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-32">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 px-4 lg:px-0">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4"
          >
            Patient Dashboard
          </motion.div>
          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">History Log</h1>
        </div>

        <div className="relative w-full lg:w-96 group">
          <input
            type="text"
            placeholder="FILTER BY NAME OR DOCTOR..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-[1.5rem] px-8 py-5 text-sm font-black text-slate-900 outline-none focus:ring-4 focus:ring-blue-100 transition-all pl-16 shadow-xl shadow-slate-100 placeholder:text-slate-200"
          />
          <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 transition-colors group-focus-within:text-blue-500" />
        </div>
      </div>

      <div className="grid gap-8">
        <AnimatePresence>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((app, idx) => (
              <motion.div 
                key={app.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-[3.5rem] p-10 lg:p-14 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col lg:flex-row items-center gap-12 group"
              >
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center space-x-6">
                      <div className="bg-slate-50 w-20 h-20 rounded-[2rem] flex items-center justify-center border border-slate-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors">
                        <Stethoscope className="w-8 h-8 text-slate-300 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 text-3xl uppercase tracking-tighter group-hover:text-blue-600 transition-colors leading-none mb-2">{app.doctorName}</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Specialized Medical Professional</p>
                      </div>
                    </div>
                    <div className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center space-x-3 shadow-inner ${
                      app.status === 'Booked' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${app.status === 'Booked' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                      <span>{app.status}</span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-300">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-1">Appointment Date</div>
                        <div className="text-sm font-black text-slate-900 tracking-tight">{format(new Date(app.date), 'MMMM d, yyyy')}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-300">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-1">Scheduled Time</div>
                        <div className="text-sm font-black text-slate-900 tracking-tight">{app.timeSlot}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-300">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-1">Registered Patient</div>
                        <div className="text-sm font-black text-slate-900 tracking-tight uppercase">{app.patientName}</div>
                      </div>
                    </div>
                  </div>
                  
                  {app.symptoms && (
                    <div className="mt-8 px-10">
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" /> Reported Diagnostics
                      </p>
                      <p className="text-sm font-medium text-slate-500 italic max-w-2xl leading-relaxed">"{app.symptoms}"</p>
                    </div>
                  )}
                </div>

                <div className="w-full lg:w-fit shrink-0">
                  {app.status === 'Booked' ? (
                    <button
                      onClick={() => handleCancel(app.id)}
                      className="w-full lg:w-48 py-5 border-2 border-red-100 bg-white text-red-600 font-black text-[10px] uppercase tracking-[0.2em] rounded-[2rem] hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-xl shadow-red-100 active:scale-95 flex items-center justify-center gap-3"
                    >
                      <Trash2 className="w-4 h-4" />
                      De-Register
                    </button>
                  ) : (
                    <div className="w-full lg:w-48 py-5 border-2 border-dashed border-slate-100 text-slate-200 font-black text-[10px] uppercase tracking-[0.2em] rounded-[2rem] text-center italic">
                      Session Closed
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-40 text-center bg-white rounded-[4rem] border border-slate-200 border-dashed"
            >
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
                <Calendar className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Zero Reservations Found</h3>
              <p className="text-slate-400 font-medium max-w-sm mx-auto mb-12 uppercase text-[10px] tracking-widest leading-loose">Schedule your first clinical interaction today</p>
              <Link to="/doctors" className="px-12 py-5 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.3em] rounded-[2rem] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-100 active:scale-95 inline-flex items-center gap-3">
                Expert Registry
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
