import React from 'react';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import PostCard from './PostCard';
import { LuClock, LuTrendingUp } from 'react-icons/lu';
import { FaFire } from 'react-icons/fa';

const DiscoverStories = ({ posts }) => {
  const tabs = [
    { name: 'Trending', icon: LuTrendingUp },
    { name: 'Latest', icon: LuClock },
    { name: 'Most Popular', icon: FaFire },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Tab.Group>
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Discover Stories
          </h2>
          
          <Tab.List className="flex space-x-2 mt-4 sm:mt-0 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {tabs.map(({ name, icon: Icon }) => (
              <Tab
                key={name}
                className={({ selected }) =>
                  `flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                  ${
                    selected
                      ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{name}</span>
              </Tab>
            ))}
          </Tab.List>
        </div>

        <Tab.Panels>
          {tabs.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className={`focus:outline-none`}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {posts.map((post) => (
                  <motion.div
                    key={post.$id}
                    variants={itemVariants}
                    className="h-full"
                  >
                    <PostCard {...post} />
                  </motion.div>
                ))}
              </motion.div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default DiscoverStories;