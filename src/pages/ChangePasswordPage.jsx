import React, { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../components";
import { Input } from "postcss";
import { HiCheckCircle, HiOutlineLockClosed } from "react-icons/hi";
import { Button, Dialog, Transition } from "@headlessui/react";

export function ChangePasswordPage() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await authService.changePassword(passwords.currentPassword, passwords.newPassword);
      setShowSuccessModal(true);
    } catch (error) {
      setError(error.message || "Failed to change password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Change Password"
      subtitle="Update your password to keep your account secure"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Current Password"
          type="password"
          value={passwords.currentPassword}
          onChange={(e) => setPasswords(prev => ({ ...prev, currentPassword: e.target.value }))}
          placeholder="Enter current password"
          icon={HiOutlineLockClosed}
          required
        />

        <Input
          label="New Password"
          type="password"
          value={passwords.newPassword}
          onChange={(e) => setPasswords(prev => ({ ...prev, newPassword: e.target.value }))}
          placeholder="Enter new password"
          icon={HiOutlineLockClosed}
          required
          minLength={8}
        />

        <Input
          label="Confirm New Password"
          type="password"
          value={passwords.confirmPassword}
          onChange={(e) => setPasswords(prev => ({ ...prev, confirmPassword: e.target.value }))}
          placeholder="Confirm new password"
          icon={HiOutlineLockClosed}
          required
          error={error}
        />

        <Button type="submit" isLoading={isLoading} className="w-full">
          Update Password
        </Button>

        <p className="text-center text-sm">
          <button
            type="button"
            onClick={() => navigate("/auth/profile")}
            className="text-blue-600 hover:text-blue-500"
          >
            Back to Profile
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
            navigate("/profile");
          }}
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl">
              <div className="flex items-center text-green-500 mb-4">
                <HiCheckCircle className="h-6 w-6 mr-2" />
                <Dialog.Title className="text-lg font-semibold">
                  Password Updated Successfully
                </Dialog.Title>
              </div>
              <Dialog.Description className="text-gray-600 dark:text-gray-400 mb-4">
                Your password has been successfully updated. Please use your new password the next time you sign in.
              </Dialog.Description>
              <Button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/auth/profile");
                }}
                className="w-full"
              >
                Return to Profile
              </Button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </AuthLayout>
  );
}