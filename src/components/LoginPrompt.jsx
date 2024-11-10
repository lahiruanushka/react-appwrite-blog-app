import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { 
  LuLogIn, 
  LuUserCircle, 
  LuPenLine, 
  LuBookmark, 
  LuX,
  LuHeart 
} from "react-icons/lu";

const LoginPrompt = ({ isOpen = true, onClose = () => {} }) => {
  const navigate = useNavigate();

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Features list with icons and descriptions
  const features = [
    {
      icon: <LuUserCircle className="w-5 h-5" />,
      text: "Access your personalized profile"
    },
    {
      icon: <LuPenLine className="w-5 h-5" />,
      text: "Create and share your stories"
    },
    {
      icon: <LuBookmark className="w-5 h-5" />,
      text: "Save posts to read later"
    },
    {
      icon: <LuHeart className="w-5 h-5" />,
      text: "Like and interact with content"
    }
  ];

  // Navigation handlers
  const handleSignIn = () => {
    onClose();
    navigate("/login");
  };

  const handleRegister = () => {
    onClose();
    navigate("/register");
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0"
          >
            {/* Semi-transparent overlay */}
            <div className="fixed inset-0 bg-gradient-to-br from-gray-50/95 to-blue-50/95 dark:from-gray-900/95 dark:to-blue-900/95 backdrop-blur-sm" />
            
            {/* Close on backdrop click */}
            <div 
              className="fixed inset-0 cursor-pointer" 
              onClick={onClose}
              aria-hidden="true"
            />
          </motion.div>

          {/* Dialog content */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-md relative"
            >
              {/* Main content card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-blue-500" />
                  <div className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full bg-blue-500" />
                </div>

                {/* Close button */}
                <motion.button
                  className="absolute right-4 top-4 p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <LuX className="w-5 h-5" />
                </motion.button>

                <div className="relative text-center">
                  {/* Logo/Icon */}
                  <motion.div
                    variants={itemVariants}
                    className="flex justify-center mb-6"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-full ring-2 ring-blue-500/20"
                    >
                      <LuLogIn className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                  </motion.div>

                  {/* Title */}
                  <Dialog.Title
                    as={motion.h2}
                    variants={itemVariants}
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
                  >
                    Welcome to Our Community
                  </Dialog.Title>

                  {/* Description */}
                  <motion.p
                    variants={itemVariants}
                    className="text-gray-600 dark:text-gray-300 mb-8"
                  >
                    Sign in to unlock all features and join our growing community
                  </motion.p>

                  {/* Features list */}
                  <motion.div 
                    variants={itemVariants}
                    className="space-y-4 mb-8"
                  >
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
                        whileHover={{ x: 5 }}
                      >
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30">
                          {feature.icon}
                        </span>
                        <span className="text-sm">{feature.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Action buttons */}
                  <motion.div 
                    variants={itemVariants}
                    className="space-y-4"
                  >
                    {/* Sign in button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSignIn}
                      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                      Sign In
                    </motion.button>
                    
                    {/* Register link */}
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      New here?{' '}
                      <button 
                        onClick={handleRegister}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium focus:outline-none focus:underline"
                      >
                        Create an account
                      </button>
                    </p>
                  </motion.div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default LoginPrompt;