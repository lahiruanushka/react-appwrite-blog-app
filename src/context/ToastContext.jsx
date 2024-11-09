import React, { createContext, useState, useContext, useCallback } from "react";
import { ToastMessage } from "../components";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ show: false, message: "", icon: null });

  const showToast = useCallback((message, icon) => {
    setToast({ show: true, message, icon });
  }, []);

  const hideToast = useCallback(() => {
    setToast({ ...toast, show: false });
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastMessage
        message={toast.message}
        show={toast.show}
        icon={toast.icon}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};
