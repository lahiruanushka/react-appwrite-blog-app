import React from "react";
import { motion } from "framer-motion";
import PostCard from "./PostCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const FeaturedPosts = ({ posts, title = "Featured Posts" }) => {
  return (
    <section className="py-12 px-4 mx-auto max-w-7xl transition-colors duration-200 ease-in-out">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300"
        >
          Explore our latest featured content
        </motion.p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {posts.map((post) => (
          <motion.div
            key={post.$id}
            variants={item}
            className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="h-full">
              <PostCard {...post} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {posts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No posts available at the moment
            </p>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default FeaturedPosts;
