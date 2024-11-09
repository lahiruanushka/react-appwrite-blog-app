import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LuHome, LuRefreshCw, LuSearch } from "react-icons/lu";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        className="max-w-2xl w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="relative" variants={itemVariants}>
          <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotate: [0, 10, -10, 10, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          >
            <LuSearch className="w-20 h-20 text-blue-500 dark:text-blue-400 opacity-50" />
          </motion.div>
        </motion.div>

        <motion.h2
          className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mt-8 mb-4"
          variants={itemVariants}
        >
          Page Not Found
        </motion.h2>

        <motion.p
          className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto"
          variants={itemVariants}
        >
          Oops! The page you&apos;re looking for seems to have gone on an
          adventure. Let&apos;s help you get back on track.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LuHome className="w-5 h-5 mr-2" />
            Go Home
          </motion.button>

          <motion.button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LuRefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;