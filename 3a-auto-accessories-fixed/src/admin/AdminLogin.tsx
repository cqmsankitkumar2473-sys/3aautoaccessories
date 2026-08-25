import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowLeft, 
  Sparkles, 
  Car, 
  AlertCircle,
  KeyRound
} from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import { useContent } from '../context/ContentContext';

interface AdminLoginProps {
  onNavigateToSite: () => void;
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onNavigateToSite, onLoginSuccess }) => {
  const { login, isLoading } = useAdminAuth();
  const { business } = useContent();

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fillMyCredentials = () => {
    setUsernameOrEmail('cqms_ankit_kumar');
    setPassword('9958473131ankitkumar');
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!usernameOrEmail.trim() || !password) {
      setErrorMessage('Please enter both your admin email/username and password.');
      return;
    }

    const result = await login(usernameOrEmail.trim(), password.trim());
    if (result.success) {
      onLoginSuccess();
    } else {
      setErrorMessage(result.error || 'Invalid login credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#040813] text-slate-100 flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden py-12">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Return to Public Website */}
      <button
        onClick={onNavigateToSite}
        className="absolute top-6 left-6 inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold backdrop-blur-md transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Public Website</span>
      </button>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#0A1224]/90 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/80 relative z-10 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Brand Emblem */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-xl shadow-amber-500/20 mb-4">
            <div className="w-full h-full bg-[#070D1E] rounded-[14px] flex items-center justify-center">
              <span className="font-brand font-black text-2xl text-gold-gradient">3A</span>
            </div>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-2">
            <Lock className="w-3 h-3" />
            <span>Owner & Admin Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {business?.name || '3A Auto Accessories'}
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            Sign in to manage products, pricing, owner details, reviews, gallery and live website content.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-start space-x-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Admin Email / Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="cqms_ankit_kumar or email"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 text-slate-100 text-sm border border-slate-700 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Password
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900/90 text-slate-100 text-sm border border-slate-700 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 1-Click Credentials Auto-Fill Button */}
          <div className="pt-1 pb-1">
            <button
              type="button"
              onClick={fillMyCredentials}
              className="w-full py-2 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Fill My Login Credentials (cqms_ankit_kumar)</span>
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-slate-950 font-black text-sm flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-101 active:scale-98 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-flex items-center space-x-2">
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Authenticating...</span>
              </span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>

        </form>

        {/* Security Badge */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted Session • Owner Controls • Real-time Sync</span>
          </div>
        </div>

      </div>

    </div>
  );
};
