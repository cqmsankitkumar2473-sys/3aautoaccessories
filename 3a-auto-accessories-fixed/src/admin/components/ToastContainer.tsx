import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useAdminData } from '../AdminDataContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useAdminData();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bg = 'bg-slate-900/95 border-amber-500/40 text-slate-100';
        let icon = <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />;

        if (toast.type === 'error') {
          bg = 'bg-rose-950/95 border-rose-500/50 text-rose-100';
          icon = <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
        } else if (toast.type === 'info') {
          bg = 'bg-blue-950/95 border-blue-500/50 text-blue-100';
          icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start justify-between p-4 rounded-2xl border shadow-2xl backdrop-blur-md animate-in slide-in-from-right-5 duration-200 ${bg}`}
          >
            <div className="flex items-start space-x-3">
              {icon}
              <div className="text-xs font-semibold leading-relaxed pt-0.5">{toast.message}</div>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white ml-2 shrink-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
