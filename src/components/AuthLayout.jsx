import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineLockClosed } from 'react-icons/hi';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 mx-auto">
      <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] dark:from-gray-800 dark:via-gray-900 dark:to-black"></div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md p-6 m-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-blue-500 rounded-full">
              <HiOutlineLockClosed className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            {title}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            {subtitle}
          </p>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
