import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import {
  HiOutlineExclamationCircle,
  HiOutlineLockClosed,
  HiOutlineMail,
} from "react-icons/hi";
import { Button, Input, AuthLayout } from "../components";
import authService from "../services/authService";
import { login as authLogin } from "../store/authSlice";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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
      setIsOpen(true);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Please enter your details to sign in"
    >
      <form onSubmit={handleSubmit(login)} className="space-y-6">
        <Input
          label="Email address"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          icon={HiOutlineMail}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          icon={HiOutlineLockClosed}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="ml-2 text-gray-600 dark:text-gray-400">
              Remember me
            </span>
          </label>
          <Link
            to="/forgot-password"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" isLoading={isSubmitting}>
          Sign in
        </Button>

        <p className="text-center text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign up
          </Link>
        </p>
      </form>

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
    </AuthLayout>
  );
}

export default LoginPage;
