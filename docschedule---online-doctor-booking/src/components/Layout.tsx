/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, User, Calendar, ShieldCheck, Home as HomeIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Doctors', path: '/doctors', icon: Stethoscope },
    { name: 'Book', path: '/book', icon: Calendar },
    { name: 'My Appointments', path: '/my-appointments', icon: User },
    { name: 'Admin', path: '/admin', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <nav className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50 overflow-hidden">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">DocSchedule</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-semibold transition-colors ${
                location.pathname === item.path
                  ? 'text-blue-600'
                  : 'text-slate-500 hover:text-blue-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link 
            to="/admin" 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              location.pathname === '/admin'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
          >
            Admin Panel
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="bg-white border-t border-slate-200 px-4 sm:px-8 py-12 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-100 rounded-md flex items-center justify-center">
              <Stethoscope className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <span className="font-bold text-slate-700">DocSchedule</span>
          </div>
          <div className="text-slate-400 text-sm font-medium tracking-wide">
            © 2024 Better Health Starts With Better Doctors.
          </div>
        </div>
      </footer>
    </div>
  );
}
