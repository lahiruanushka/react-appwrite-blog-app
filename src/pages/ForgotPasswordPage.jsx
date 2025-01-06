import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {  HiOutlineMail, HiCheckCircle } from "react-icons/hi";
import { Button, Input, AuthLayout } from "../components";
import authService from "../services/authService";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await authService.sendPasswordResetEmail(email);
      setShowSuccessModal(true);
    } catch (error) {
      setError(error.message || "Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email and we'll send you instructions to reset your password"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          icon={HiOutlineMail}
          required
          error={error}
        />

        <Button type="submit" isLoading={isLoading} className="w-full">
          Send Reset Instructions
        </Button>

        <p className="text-center text-sm">
          <button
            type="button"
            onClick={() => navigate("/sign-in")}
            className="text-blue-600 hover:text-blue-500"
          >
            Back to Sign In
          </button>
        </p>
      </form>

      {/* Success Modal */}
      <Transition show={showSuccessModal} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => {
            setShowSuccessModal(false);
            navigate("/sign-in");
          }}
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl">
              <div className="flex items-center text-green-500 mb-4">
                <HiCheckCircle className="h-6 w-6 mr-2" />
                <Dialog.Title className="text-lg font-semibold">
                  Check Your Email
                </Dialog.Title>
              </div>
              <Dialog.Description className="text-gray-600 dark:text-gray-400 mb-4">
                We've sent password reset instructions to {email}. Please check your inbox.
              </Dialog.Description>
              <Button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/auth/sign-in");
                }}
                className="w-full"
              >
                Return to Sign In
              </Button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </AuthLayout>
  );
}
