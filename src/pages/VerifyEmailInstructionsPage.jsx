import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  HiOutlineMail,
  HiOutlineMailOpen,
  HiCheckCircle,
  HiXCircle,
} from "react-icons/hi";
import authService from "../services/authService";

function VerifyEmailInstructionsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState("");

  const resendVerificationEmail = async () => {
    setIsLoading(true);
    try {
      await authService.createVerification();
      setShowSuccessModal(true);
    } catch (error) {
      setError("Failed to resend verification email. Please try again.");
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
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <HiOutlineMail className="h-8 w-8 text-blue-600 dark:text-blue-300" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Verify your email
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              We've sent you a verification link to your email address. To
              continue, please check your inbox and confirm your email address.
            </p>
          </div>

          {/* Instructions Section */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <HiOutlineMailOpen className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Open your inbox and click the link in the email to verify your
                account.
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
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={resendVerificationEmail}
              disabled={isLoading}
              className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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
                "Resend verification email"
              )}
            </button>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Didn't receive the email? No worries! Check your spam folder, or
              click the button above to resend it.
            </p>
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
                A new verification email has been sent to your address. Please
                check your inbox.
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
    </div>
  );
}

export default VerifyEmailInstructionsPage;
