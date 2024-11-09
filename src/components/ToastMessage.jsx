import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastMessage = ({ message, type = 'info', onClose }) => {
  // Automatically close the toast after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  // Define styles based on the type of toast message
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-5 right-5 p-4 rounded-lg shadow-lg ${getTypeStyles()}`}
      >
        <div className="flex items-center justify-between">
          <span>{message}</span>
          <button onClick={onClose} className="ml-4 font-bold">X</button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ToastMessage;
