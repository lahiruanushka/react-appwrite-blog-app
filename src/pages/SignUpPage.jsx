import React, { useState } from "react";
import authService from "../api/authService";
import { Link, useNavigate } from "react-router-dom";
import { Input, Logo, Button } from "../components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Dialog } from "@headlessui/react";

function SignUpPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [isOpen, setIsOpen] = useState(false); // Modal state for error

  const create = async (data) => {
    setError("");
    try {
      console.log(data);
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      setIsOpen(true); // Open the error modal
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-8 shadow-lg border border-gray-200">
        <div className="flex justify-center mb-6">
          <Logo width="50%" className="max-w-[60px]" />
        </div>
        <h2 className="text-center text-3xl font-semibold text-gray-800">
          Create your account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
        <form onSubmit={handleSubmit(create)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Full Name"
              type="text"
              {...register("fullname", { required: true })}
            />
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
            Create Account
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

export default SignUpPage;
