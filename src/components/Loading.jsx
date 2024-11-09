import React from "react";
import { motion } from "framer-motion";
import { Puff } from "react-loader-spinner";

const Loading = ({ loading }) => {
  if (!loading) return null;

  return (
    <motion.div
      className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Puff
        visible={true}
        height="80"
        width="80"
        color="#8a2be2"
        ariaLabel="puff-loading"
      />
    </motion.div>
  );
};

export default Loading;
