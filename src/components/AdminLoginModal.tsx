import React, { useState } from 'react';
import { Lock, X, ShieldCheck } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ADMIN_PASSWORD = 'MNassar@2026'; // 👈 غيّري هالباسوورد لأي شي بدك ياه

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('mnassar_admin_auth', 'true');
      setPassword('');
      setError('');
      onSuccess();
    } else {
      setError('كلمة السر غير صحيحة، حاول مجدداً');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 text-right">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
          aria-label="إغلاق"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center gap-2 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-950 text-amber-400 flex items-center justify-center shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-black text-slate-900">دخول لوحة التحكم</h2>
          <p className="text-xs text-slate-500">هذه الصفحة مخصصة لإدارة م. نصار العقارية فقط</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3" />
            <input
              type="password"
              autoFocus
              placeholder="كلمة السر"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 pr-9 pl-3 text-sm focus:border-emerald-700 focus:outline-none"
            />
          </div>

          {error && <p className="text-rose-600 text-xs font-bold">{error}</p>}

          <button
            type="submit"
            className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-black text-sm py-3 rounded-xl shadow transition-all"
          >
            دخول
          </button>
        </form>
      </div>
    </div>
  );
};
