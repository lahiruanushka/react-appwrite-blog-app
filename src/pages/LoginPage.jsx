import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { Input, Button } from "../components";
import { login as authLogin } from "../store/authSlice";
import { Dialog } from "@headlessui/react"; // Headless UI Modal

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Modal state for error

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      setIsOpen(true); // Open the error modal on failure
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-8 shadow-lg border border-gray-200">
        <div className="flex justify-center mb-6">
          <img src="" alt="logo" />
        </div>
        <h2 className="text-center text-3xl font-semibold text-gray-800">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              label="Email"
              placeholder="Email Address"
              type="email"
              {...register("email", { required: true })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </div>
          <Button type="submit" className="w-full">
            Sign in{" "}
          </Button>
        </form>
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}
      </div>

      {/* Error Modal using Headless UI Dialog */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Dialog.Panel className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <Dialog.Title className="text-lg font-semibold text-red-600">
              Error
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-gray-600">
              {error || "An unexpected error occurred. Please try again."}
            </Dialog.Description>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default LoginPage;
