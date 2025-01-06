import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { HiCheckCircle, HiXCircle, HiClock } from "react-icons/hi";
import authService from "../services/authService";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";

function VerifyEmailCompletePage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    const secret = urlParams.get("secret");

    if (userId && secret) {
      completeEmailVerification(userId, secret);
    } else {
      setError("Invalid verification link.");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let timer;

    const handleCountdown = async () => {
      if (isVerified && countdown > 0) {
        timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
      } else if (isVerified && countdown === 0) {
        navigate("/");
      }
    };

    handleCountdown();

    return () => clearTimeout(timer);
  }, [isVerified, countdown, navigate, dispatch]);

  const completeEmailVerification = async (userId, secret) => {
    try {
      await authService.completeEmailVerification(userId, secret);
      setIsVerified(true);
    } catch (error) {
      setError(
        "Email verification failed. Please try again or contact support."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAgain = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Transition
          show={true}
          enter="transform transition duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            {/* Loading State */}
            {isLoading && (
              <div className="text-center">
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                  <HiClock className="h-8 w-8 text-blue-600 dark:text-blue-300 animate-pulse" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Verifying Your Email
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Please wait while we verify your email address...
                </p>
                <div className="mt-4">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              </div>
            )}

            {/* Success State */}
            {!isLoading && isVerified && (
              <div className="text-center">
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900 mb-4">
                  <HiCheckCircle className="h-8 w-8 text-green-600 dark:text-green-300" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Email Verified Successfully!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Thank you for verifying your email address. You'll be
                  redirected to the homepage in {countdown} seconds.
                </p>
              </div>
            )}

            {/* Error State */}
            {!isLoading && error && (
              <div className="text-center">
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900 mb-4">
                  <HiXCircle className="h-8 w-8 text-red-600 dark:text-red-300" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Verification Failed
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
                <div className="space-y-3">
                  <button
                    onClick={handleTryAgain}
                    className="w-full px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={handleGoHome}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            )}
          </div>
        </Transition>
      </div>
    </div>
  );
}

export default VerifyEmailCompletePage;
