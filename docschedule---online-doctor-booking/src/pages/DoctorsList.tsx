/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Calendar as CalendarIcon, Search, ArrowRight, Activity } from 'lucide-react';
import { storage } from '../lib/storage';
import { Doctor } from '../types';
import { SPECIALIZATIONS, DAYS_OF_WEEK } from '../constants';
import { motion } from 'motion/react';

export default function DoctorsList() {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialization, setSpecialization] = useState<string>(searchParams.get('specialization') || 'All');
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setDoctors(storage.getDoctors());
  }, []);

  const filteredDoctors = doctors.filter((doc) => {
    const specMatch = specialization === 'All' || doc.specialization === specialization;
    const dayMatch = selectedDay === 'All' || doc.days.includes(selectedDay);
    const searchMatch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      doc.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    return specMatch && dayMatch && searchMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-32">
      <div className="mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4"
        >
          Expert Registry
        </motion.div>
        <h1 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tighter">Our Specialists</h1>
        <p className="text-slate-500 font-medium text-lg lg:text-xl max-w-2xl leading-relaxed">
          The best medical outcomes are driven by the best professionals. Filter by specialization to start your journey.
        </p>
      </div>

      {/* Modern Filter Interface */}
      <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-100 mb-20 relative z-10">
        <div className="grid lg:grid-cols-4 gap-8 items-end">
          <div className="lg:col-span-1">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Medical Sector</label>
            <div className="relative group">
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] px-6 py-4 text-sm font-black text-slate-900 outline-none focus:ring-4 focus:ring-blue-100 transition-all appearance-none uppercase tracking-tight"
              >
                <option value="All">All Specializations</option>
                {SPECIALIZATIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                <Filter className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Availability</label>
            <div className="relative group">
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] px-6 py-4 text-sm font-black text-slate-900 outline-none focus:ring-4 focus:ring-blue-100 transition-all appearance-none uppercase tracking-tight"
              >
                <option value="All">Any Specific Day</option>
                {DAYS_OF_WEEK.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                <CalendarIcon className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Live Search</label>
            <div className="relative group">
              <input
                type="text"
                placeholder="Doctor name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] px-6 py-4 text-sm font-black text-slate-900 outline-none focus:ring-4 focus:ring-blue-100 transition-all pl-14"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => { setSpecialization('All'); setSelectedDay('All'); setSearchQuery(''); }}
              className="px-8 py-4 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all border border-slate-100"
            >
              Reset
            </button>
            <div className="hidden lg:flex w-14 h-14 bg-slate-900 rounded-[1.5rem] items-center justify-center text-white shadow-xl shadow-slate-200">
              <ActivityIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Professional Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredDoctors.map((doc, idx) => (
            <motion.div 
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white rounded-[3.5rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-400 transition-all duration-700 flex flex-col"
            >
              <div className="relative h-80 overflow-hidden bg-slate-100">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-[1.5rem] text-[10px] font-black text-blue-600 shadow-sm uppercase tracking-[0.2em]">
                  {doc.experience} Years of Clinic
                </div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-2">{doc.name}</h3>
                  <div className="flex gap-2">
                    {doc.days.map((day, dIdx) => (
                      <span key={dIdx} className="px-2.5 py-1 bg-white/10 backdrop-blur-xl border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest text-white/90">
                        {day.slice(0, 3)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-12 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[9px] font-black rounded-full uppercase tracking-widest border border-blue-100">
                    {doc.specialization}
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Consultation</p>
                    <p className="text-xl font-black text-slate-900">${doc.fee}</p>
                  </div>
                </div>
                
                <p className="text-slate-400 text-sm mb-10 line-clamp-3 leading-relaxed font-medium italic">
                  "{doc.about}"
                </p>

                <Link
                  to={`/book?doctorId=${doc.id}`}
                  className="mt-auto w-full py-5 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-[2rem] flex items-center justify-center transition-all shadow-xl shadow-slate-200 group-hover:bg-blue-600 group-hover:shadow-blue-200 active:scale-95"
                >
                  Confirm Expert Visit
                  <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-40 text-center bg-white rounded-[4rem] border border-slate-200 border-dashed">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
            <Search className="w-10 h-10" />
          </div>
          <h3 className="text-3xl font-black text-slate-900 mb-3 uppercase tracking-tighter">No experts match</h3>
          <p className="text-slate-400 font-semibold max-w-sm mx-auto uppercase text-[10px] tracking-widest">Refine your search parameters</p>
        </div>
      )}
    </div>
  );
}

function ActivityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}
