import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BiWrench, BiTime, BiErrorCircle } from 'react-icons/bi';

const MaintenancePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center space-y-6">
            {/* Icon and Title */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="absolute -top-1 -right-1">
                  <BiTime className="w-6 h-6 text-gray-400 dark:text-gray-500 animate-pulse" />
                </div>
                <BiWrench className="w-16 h-16 text-blue-500 dark:text-blue-400 animate-spin-slow" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                Under Maintenance
              </h1>
            </div>

            {/* Main Message */}
            <div className="space-y-4">
              <p className="text-xl text-gray-600 dark:text-gray-300">
                We're currently performing some scheduled maintenance to improve our services.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                We apologize for any inconvenience. Our team is working hard to get everything back up and running smoothly.
              </p>
            </div>

            {/* Expected Duration Alert */}
            <div className="max-w-lg mx-auto bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <BiErrorCircle className="h-5 w-5 flex-shrink-0" />
                <p>
                  Expected maintenance duration: <span className="font-semibold">2 hours</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors">
                <BiTime className="w-4 h-4 mr-2" />
                Check Status
              </button>
              <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors">
                <BiErrorCircle className="w-4 h-4 mr-2" />
                Get Updates
              </button>
            </div>

            {/* Footer */}
            <div className="text-sm text-gray-500 dark:text-gray-400 pt-6">
              <p>Need immediate assistance? Contact our support team:</p>
              <p className="font-medium">support@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;