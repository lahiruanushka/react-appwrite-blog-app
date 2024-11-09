import { useEffect } from "react";
import { Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { BiErrorCircle } from "react-icons/bi";
import { FiRefreshCw } from "react-icons/fi";

const ErrorMessage = ({ error, title }) => {

  const onRetry = () => {
    window.location.reload();
  };

  if (!error) return null;

  return (
    <Transition
      appear
      show={error}
      as="div"
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <motion.div
        className="flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-gray-900 p-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="flex items-center space-x-3 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 p-6 rounded-lg shadow-lg">
          <BiErrorCircle className="h-8 w-8" />
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            <p className="text-sm mt-1">
              Sorry, something went wrong. Please try again later.
            </p>
          </div>
        </div>

        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-gray-900 transition-all"
        >
          <FiRefreshCw className="h-5 w-5 mr-2" />
          Retry
        </button>
      </motion.div>
    </Transition>
  );
};

export default ErrorMessage;
