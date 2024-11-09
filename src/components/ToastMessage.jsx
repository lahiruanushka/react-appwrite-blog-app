import React, { useEffect } from "react";
import { Transition } from "@headlessui/react";
import { LuShare2 } from "react-icons/lu";
import { BiX } from "react-icons/bi";

const ToastMessage = ({
  message,
  show,
  onClose,
  icon = <LuShare2 className="h-6 w-6 text-green-400" />,
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // auto-close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <Transition
      show={show}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-[-100%] opacity-0"
      enterTo="translate-y-0 opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="translate-y-[-100%] opacity-0"
      className="fixed top-4 left-1/2 transform -translate-x-1/2 max-w-sm w-full bg-gray-800 text-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5 p-4 z-50"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium text-white">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className="rounded-md inline-flex text-gray-400 hover:text-gray-300 focus:outline-none"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <BiX className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Transition>
  );
};

export default ToastMessage;
