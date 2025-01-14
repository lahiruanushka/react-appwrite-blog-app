import React, { useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { FcGoogle } from "react-icons/fc";
import authService from "../services/authService";
import Button from "./Button";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const GoogleSignInButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await authService.signInWithGoogle();
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setError(error.message);
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left w-full">
        <div>
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <FcGoogle className="w-5 h-5" />
            <span className="text-gray-700 font-medium">
              {isLoading ? "Connecting..." : "Continue with Google"}
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
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {isLoading && (
              <div className="px-4 py-2 text-sm text-gray-500">
                Redirecting to Google...
              </div>
            )}
          </Menu.Items>
        </Transition>
      </Menu>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl">
            <div className="flex items-center text-red-500 mb-4">
              <HiOutlineExclamationCircle className="h-6 w-6 mr-2" />
              <Dialog.Title className="text-lg font-semibold">
                Error
              </Dialog.Title>
            </div>
            <Dialog.Description className="text-gray-600 dark:text-gray-400 mb-4">
              {error || "An unexpected error occurred. Please try again."}
            </Dialog.Description>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default GoogleSignInButton;
