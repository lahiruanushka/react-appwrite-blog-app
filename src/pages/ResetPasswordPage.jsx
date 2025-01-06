import { Dialog, Transition } from "@headlessui/react";
import { Button, Input, AuthLayout } from "../components";
import { HiCheckCircle } from "react-icons/hi2";
import authService from "../services/authService";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineLockClosed } from "react-icons/hi";

export function ResetPasswordPage() {
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!userId && !secret) {
      setError("Invalid Reset Password link.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await authService.resetPassword(userId, secret, passwords.password, passwords.confirmPassword);
      setShowSuccessModal(true);
    } catch (error) {
      setError(error.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Reset Password" subtitle="Enter your new password below">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="New Password"
          type="password"
          value={passwords.password}
          onChange={(e) =>
            setPasswords((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="Enter new password"
          icon={HiOutlineLockClosed}
          required
          minLength={8}
        />

        <Input
          label="Confirm Password"
          type="password"
          value={passwords.confirmPassword}
          onChange={(e) =>
            setPasswords((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          placeholder="Confirm new password"
          icon={HiOutlineLockClosed}
          required
          error={error}
        />

        <Button type="submit" isLoading={isLoading} className="w-full">
          Reset Password
        </Button>
      </form>

      {/* Success Modal */}
      <Transition show={showSuccessModal} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => {
            setShowSuccessModal(false);
            navigate("/auth/sign-in");
          }}
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl">
              <div className="flex items-center text-green-500 mb-4">
                <HiCheckCircle className="h-6 w-6 mr-2" />
                <Dialog.Title className="text-lg font-semibold">
                  Password Reset Successful
                </Dialog.Title>
              </div>
              <Dialog.Description className="text-gray-600 dark:text-gray-400 mb-4">
                Your password has been successfully reset. You can now sign in
                with your new password.
              </Dialog.Description>
              <Button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/sign-in");
                }}
                className="w-full"
              >
                Sign In
              </Button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </AuthLayout>
  );
}
