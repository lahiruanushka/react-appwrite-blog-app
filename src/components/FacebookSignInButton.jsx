import React, { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FaFacebook } from "react-icons/fa";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const FacebookSignInButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFacebookSignIn = async () => {
    try {
      setIsLoading(true);
      // await authService.signInWithFacebook();
      navigate("/maintenance");
    } catch (error) {
      console.error("Facebook sign-in failed:", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div>
        <button
          onClick={handleFacebookSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-facebook disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <FaFacebook className="w-5 h-5 text-[#1877F2]" />
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            {isLoading ? "Connecting..." : "Continue with Facebook"}
          </span>
        </button>
      </div>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
          {isLoading && (
            <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
              Redirecting to Facebook...
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default FacebookSignInButton;
