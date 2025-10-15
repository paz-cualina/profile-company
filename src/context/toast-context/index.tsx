'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ToastEnum } from '../../types/enum/toast.enum';
import Toast from '../../components/toast';

interface ToastContextType {
  showToast: (type: ToastEnum, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<{
    type: ToastEnum;
    message: string;
  } | null>(null);

  const showToast = (type: ToastEnum, message: string) => {
    setToast({ type, message });
  };

  const handleClose = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast type={toast.type} message={toast.message} onClose={handleClose} />}
    </ToastContext.Provider>
  );
};
