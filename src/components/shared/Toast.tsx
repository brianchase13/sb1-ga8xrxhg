import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  showToast: (type: ToastType, title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-20 right-4 z-[100] space-y-2 max-w-sm">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem: React.FC<{ toast: Toast; onClose: () => void }> = ({ toast, onClose }) => {
  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-primary-900/90',
      borderColor: 'border-primary-700/50',
      iconColor: 'text-primary-400',
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-accent-900/90',
      borderColor: 'border-accent-700/50',
      iconColor: 'text-accent-400',
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-gold-900/90',
      borderColor: 'border-gold-700/50',
      iconColor: 'text-gold-400',
    },
    info: {
      icon: Info,
      bgColor: 'bg-dark-800/90',
      borderColor: 'border-dark-700/50',
      iconColor: 'text-dark-300',
    },
  };

  const { icon: Icon, bgColor, borderColor, iconColor } = config[toast.type];

  return (
    <div
      className={`${bgColor} ${borderColor} backdrop-blur-xl border rounded-xl p-4 shadow-2xl animate-slide-down`}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`h-5 w-5 ${iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-dark-100">{toast.title}</h4>
          {toast.message && <p className="text-xs text-dark-400 mt-1">{toast.message}</p>}
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-dark-400 hover:text-dark-200 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
