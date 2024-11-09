import React from "react";
import { motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center space-y-8"
        >
          <motion.div variants={itemVariants}>
            <motion.h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-gray-900 dark:text-gray-100">
                Welcome to
              </span>
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BlogVerse
              </span>
            </motion.h1>
            <motion.p 
              className="mt-6 max-w-2xl mx-auto text-xl sm:text-2xl text-gray-600 dark:text-gray-300"
            >
              Discover the latest trends and insights in the blogosphere, where ideas come to life and stories unfold.
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex items-center gap-2 hover:shadow-lg transition-shadow duration-300"
            >
              Start Reading
              <LuArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              Create Account
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { label: "Active Readers", value: "10K+" },
              { label: "Articles", value: "5K+" },
              { label: "Writers", value: "1K+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8 + index * 0.1,
                  duration: 0.5
                }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-2xl font-bold text-gray-900 dark:text-gray-100"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;