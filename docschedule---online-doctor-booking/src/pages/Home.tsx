/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { Search, ArrowRight, Stethoscope, Clock, Users, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { SPECIALIZATIONS } from '../constants';

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:grid lg:grid-cols-12 gap-12 py-12 lg:py-24">
        {/* Left Section: Hero & Search */}
        <div className="lg:col-span-7 flex flex-col justify-center mb-16 lg:mb-0">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-block w-fit px-4 py-1.5 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full"
          >
            Healthcare for you
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight"
          >
            Better Health Starts <br/><span className="text-blue-600">With Better Doctors.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg lg:text-xl mb-12 max-w-md leading-relaxed font-medium"
          >
            Book your appointments instantly with top-rated medical specialists in your city.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-2.5 rounded-3xl shadow-2xl shadow-blue-900/5 border border-slate-200 flex items-center gap-2 max-w-xl group focus-within:border-blue-400 transition-all"
          >
            <div className="flex-1 px-5 py-2 flex items-center gap-4">
              <Search className="w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search specialization (e.g. Cardiology)" 
                className="w-full outline-none text-slate-700 text-sm font-bold placeholder:text-slate-300"
              />
            </div>
            <Link 
              to="/doctors"
              className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
            >
              Search
            </Link>
          </motion.div>

          {/* Specialties */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Popular Specialties</h3>
            <div className="flex flex-wrap gap-3">
              {SPECIALIZATIONS.slice(0, 4).map((spec) => (
                <Link 
                  key={spec}
                  to={`/doctors?specialization=${spec}`}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 cursor-pointer hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm uppercase tracking-widest active:scale-95"
                >
                  {spec}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Section: Mini Dashboard / Preview */}
        <div className="lg:col-span-5 flex flex-col gap-8 justify-center">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-2xl shadow-slate-200/50 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6">
              <div className="w-40 h-40 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-40 transition-transform group-hover:scale-110"></div>
            </div>
            
            <h2 className="text-[10px] font-black text-slate-800 mb-10 flex items-center gap-3 uppercase tracking-[0.3em]">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              Live Appointment
            </h2>
            
            <div className="flex items-center gap-6 mb-10">
              <div className="w-20 h-20 bg-slate-100 rounded-[2rem] overflow-hidden shadow-inner border border-slate-50 shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=200" 
                  alt="Doctor"
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div>
                <p className="font-black text-slate-900 text-xl uppercase tracking-tighter">Dr. Sarah Mitchell</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Cardiology Specialist</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100 group-hover:bg-blue-50 transition-colors">
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Clinic Date</p>
                <p className="text-sm font-black text-slate-900">Oct 24, 2024</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100 group-hover:bg-blue-50 transition-colors">
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Time Slot</p>
                <p className="text-sm font-black text-slate-900">10:30 AM</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">
                Reschedule
              </button>
              <button className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95">
                Cancel
              </button>
            </div>
          </motion.div>

          {/* Statistics Row */}
          <div className="grid grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-blue-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-blue-200/50"
            >
              <p className="text-6xl font-black mb-2 tracking-tighter">50+</p>
              <p className="text-[10px] opacity-70 uppercase font-black tracking-[0.4em]">Experts</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white border border-slate-200 p-10 rounded-[3rem] shadow-sm flex flex-col justify-center"
            >
              <p className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">4.9</p>
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.4em]">Rating</p>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Featured Banner */}
      <footer className="bg-white border-t border-slate-200 py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-3">Staff Recognition</h3>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Top Rated Doctors</h2>
            </div>
            <Link to="/doctors" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline underline-offset-8">
              View All Specialist Registry
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-6 flex items-center gap-6 hover:bg-white hover:border-blue-300 hover:shadow-xl transition-all cursor-pointer group">
              <div className="w-16 h-16 bg-slate-300 rounded-[1.5rem] overflow-hidden border border-slate-200 shrink-0">
                <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all" />
              </div>
              <div className="overflow-hidden">
                <p className="text-base font-black text-slate-900 uppercase tracking-tight truncate">Dr. Michael Chen</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Pediatrician • 8 yrs Exp</p>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-6 flex items-center gap-6 hover:bg-white hover:border-blue-300 hover:shadow-xl transition-all cursor-pointer group">
              <div className="w-16 h-16 bg-slate-300 rounded-[1.5rem] overflow-hidden border border-slate-200 shrink-0">
                <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all" />
              </div>
              <div className="overflow-hidden">
                <p className="text-base font-black text-slate-900 uppercase tracking-tight truncate">Dr. James Wilson</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Neurologist • 15 yrs Exp</p>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-6 flex items-center gap-6 hover:bg-white hover:border-blue-300 hover:shadow-xl transition-all cursor-pointer group">
              <div className="w-16 h-16 bg-slate-300 rounded-[1.5rem] overflow-hidden border border-slate-200 shrink-0">
                <img src="https://images.unsplash.com/photo-1512349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all" />
              </div>
              <div className="overflow-hidden">
                <p className="text-base font-black text-slate-900 uppercase tracking-tight truncate">Dr. Robert Brown</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Orthopedic • 20 yrs Exp</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
