import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { FiLoader, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import authService from "../services/authService";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error'

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { user, profile } = await authService.handleOAuthCallback();
        setStatus("success");

        // Brief delay to show success state before redirect
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (error) {
        console.error("OAuth callback error:", error);
        setError("Failed to complete authentication. Please try again.");
        setStatus("error");

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    };

    handleCallback();
  }, [navigate]);

  const renderContent = () => {
    switch (status) {
      case "error":
        return (
          <div className="flex flex-col items-center space-y-4">
            <FiAlertCircle className="w-12 h-12 text-red-500 dark:text-red-400" />
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Authentication Failed
              </h3>
              <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Redirecting to login page...
              </p>
            </div>
          </div>
        );

      case "success":
        return (
          <div className="flex flex-col items-center space-y-4">
            <FiCheckCircle className="w-12 h-12 text-green-500 dark:text-green-400" />
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Successfully Signed In
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Redirecting to dashboard...
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center space-y-4">
            <FiLoader className="w-12 h-12 text-indigo-500 dark:text-indigo-400 animate-spin" />
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Almost there...
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Completing sign in
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full mx-4">
        <Transition
          show={true}
          appear={true}
          enter="transform transition duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            {renderContent()}
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default OAuthCallback;
