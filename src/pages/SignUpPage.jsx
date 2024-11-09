import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import {
  HiOutlineExclamationCircle,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlineUser,
} from "react-icons/hi";
import { Button, Input, AuthLayout } from "../components";
import authService from "../services/authService";

function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const create = async (data) => {
    setError("");
    try {
      const { fullname, email, password } = data;
      const session = await authService.createAccount({
        email,
        password,
        name: fullname, // Pass fullname as name
      });
      console.log("User signed up and logged in:", session);
      navigate("/");
    } catch (error) {
      setError(error.message);
      setIsOpen(true);
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join us today and get started"
    >
      <form onSubmit={handleSubmit(create)} className="space-y-6">
        <Input
          label="Full name"
          type="text"
          placeholder="Enter your full name"
          error={errors.fullname?.message}
          icon={HiOutlineUser}
          {...register("fullname", {
            required: "Full name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
        />
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
          placeholder="Create a password"
          error={errors.password?.message}
          icon={HiOutlineLockClosed}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />

        <Button type="submit" isLoading={isSubmitting}>
          Create account
        </Button>

        <p className="text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign in
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

export default SignUpPage;
