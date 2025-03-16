import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  HiOutlineLockClosed,
  HiOutlineMailOpen,
  HiCheckCircle,
  HiXCircle,
  HiOutlineShieldCheck,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import authService from "../services/authService";

function PasswordResetInstructionsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showPasswordTipsModal, setShowPasswordTipsModal] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const resendPasswordResetEmail = async () => {
    if (!email.trim()) {
      setError("Please enter your email address");
      setShowErrorModal(true);
      return;
    }

    setIsLoading(true);
    try {
      await authService.requestPasswordReset(email);
      setShowSuccessModal(true);
    } catch (error) {
      setError("Failed to send password reset email. Please try again.");
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4">
              <HiOutlineLockClosed className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Reset your password
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              We've sent you a password reset link to your email address. To
              continue, please check your inbox and follow the instructions to
              reset your password.
            </p>
          </div>

          {/* Instructions Section */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <HiOutlineMailOpen className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Open your inbox and click the link in the email to set a new
                password for your account.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <HiOutlineMailOpen className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Make sure to check your spam or junk folder if you don't see the
                email in your inbox.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <HiOutlineLockClosed className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                For security reasons, the password reset link will expire after
                24 hours.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <HiOutlineShieldCheck className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  When creating your new password, make sure it's strong and
                  secure.
                </p>
                <button
                  onClick={() => setShowPasswordTipsModal(true)}
                  className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-500 mt-1"
                >
                  View password strength tips →
                </button>
              </div>
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Enter your email to resend the reset link
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={resendPasswordResetEmail}
              disabled={isLoading}
              className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Resend password reset email"
              )}
            </button>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Didn't receive the email? No worries! Check your spam folder, or
              enter your email above and click the button to send a new reset
              link.
            </p>
          </div>

          {/* Password Security Section */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <HiOutlineShieldCheck className="h-5 w-5 text-indigo-500 mr-2" />
              <h3 className="text-md font-medium text-gray-900 dark:text-white">
                Password Security
              </h3>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                When creating your new password, remember:
              </p>
              <ul className="space-y-2">
                <li className="flex text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-green-500 mr-2">✓</span>
                  Use at least 8 characters
                </li>
                <li className="flex text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-green-500 mr-2">✓</span>
                  Include uppercase and lowercase letters
                </li>
                <li className="flex text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-green-500 mr-2">✓</span>
                  Include at least one number
                </li>
                <li className="flex text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-green-500 mr-2">✓</span>
                  Include at least one special character
                </li>
              </ul>
              <button
                onClick={() => setShowPasswordTipsModal(true)}
                className="mt-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-500"
              >
                Learn more about password security
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Transition show={showSuccessModal} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setShowSuccessModal(false)}
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl">
              <div className="flex items-center text-green-500 mb-4">
                <HiCheckCircle className="h-6 w-6 mr-2" />
                <Dialog.Title className="text-lg font-semibold">
                  Email Sent Successfully
                </Dialog.Title>
              </div>
              <Dialog.Description className="text-gray-600 dark:text-gray-400 mb-4">
                Your password reset email has been sent to {email}. Please check
                your inbox or spam folder.
              </Dialog.Description>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Got it
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      {/* Error Modal */}
      <Transition show={showErrorModal} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setShowErrorModal(false)}
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl">
              <div className="flex items-center text-red-500 mb-4">
                <HiXCircle className="h-6 w-6 mr-2" />
                <Dialog.Title className="text-lg font-semibold">
                  Error
                </Dialog.Title>
              </div>
              <Dialog.Description className="text-gray-600 dark:text-gray-400 mb-4">
                {error}
              </Dialog.Description>
              <button
                onClick={() => setShowErrorModal(false)}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Close
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      {/* Password Tips Modal */}
      <Transition show={showPasswordTipsModal} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setShowPasswordTipsModal(false)}
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-md rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl">
              <div className="flex items-center text-indigo-500 mb-4">
                <HiOutlineShieldCheck className="h-6 w-6 mr-2" />
                <Dialog.Title className="text-lg font-semibold">
                  Password Strength Tips
                </Dialog.Title>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Password Requirements:
                </h4>
                <ul className="space-y-2 mb-4">
                  <li className="flex text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-green-500 mr-2">✓</span>
                    At least 8 characters in length
                  </li>
                  <li className="flex text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-green-500 mr-2">✓</span>
                    Contains uppercase letters (A-Z)
                  </li>
                  <li className="flex text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-green-500 mr-2">✓</span>
                    Contains lowercase letters (a-z)
                  </li>
                  <li className="flex text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-green-500 mr-2">✓</span>
                    Contains at least one number (0-9)
                  </li>
                  <li className="flex text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-green-500 mr-2">✓</span>
                    Contains at least one special character (e.g., !@#$%^&*)
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Tips for a Strong Password:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2 mt-0.5">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Use a unique password for each account - never reuse
                      passwords
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2 mt-0.5">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Consider using a passphrase (a series of random words)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2 mt-0.5">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Avoid using personal information (birthdays, names, etc.)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2 mt-0.5">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Avoid common words and patterns like "password" or
                      "123456"
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2 mt-0.5">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Consider using a password manager to generate and store
                      strong passwords
                    </span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setShowPasswordTipsModal(false)}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Got it
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default PasswordResetInstructionsPage;