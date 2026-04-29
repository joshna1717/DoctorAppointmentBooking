/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Lock, User, Key, AlertCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      setError('System rejection: Invalid credentials.');
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-8 bg-slate-100">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[4rem] p-12 lg:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.05)] border border-slate-200 text-center"
      >
        <div className="inline-block p-6 bg-slate-900 rounded-3xl mb-12 text-white shadow-2xl shadow-slate-300">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tighter uppercase">Terminal Access</h1>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-12">Administrative Gateway</p>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10 p-5 bg-red-50 text-red-600 border border-red-100 rounded-3xl flex items-center space-x-4 text-[10px] font-black uppercase tracking-widest italic"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <div className="relative group">
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] px-6 py-5 text-sm font-black text-slate-900 outline-none focus:ring-4 focus:ring-blue-100 transition-all pl-14 placeholder:text-slate-300"
                placeholder="USERNAME"
              />
              <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
            </div>
          </div>

          <div>
            <div className="relative group">
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] px-6 py-5 text-sm font-black text-slate-900 outline-none focus:ring-4 focus:ring-blue-100 transition-all pl-14 placeholder:text-slate-300"
                placeholder="PASSWORD"
              />
              <Key className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-6 bg-slate-900 text-white font-black text-sm uppercase tracking-[0.3em] rounded-[2rem] transition-all shadow-2xl shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-200 active:scale-95 flex items-center justify-center gap-3"
          >
            Authenticate
            <ShieldCheck className="w-5 h-5 opacity-40" />
          </button>
        </form>

        <div className="mt-16 pt-10 border-t border-slate-100">
          <p className="text-[9px] text-slate-300 font-extrabold uppercase tracking-[0.5em]">System Protected By DocSchedule Security</p>
        </div>
      </motion.div>
    </div>
  );
}
