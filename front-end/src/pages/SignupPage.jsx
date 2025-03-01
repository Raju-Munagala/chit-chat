import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.firstName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email.trim()
      )
    )
      return toast.error("Enter valid email");
    if (formData.password.trim().length < 6)
      return toast.error("Password must be atleast 6 characters");

    return true
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if(isFormValid) signup(formData)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-200">
      <div className="w-11/12 max-w-4xl flex flex-col sm:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full sm:w-1/2 bg-gradient-to-r from-red-400 to-purple-500 relative h-48 sm:h-auto flex-none">
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-400 bg-opacity-50">
            <h2 className="text-4xl text-white font-bold animate-slideInLeft">
              Welcome!
            </h2>
            <p className="text-white mt-4 animate-slideInLeft">
              Join us and start your journey today.
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Create an Account
          </h2>
          <form className="mt-6">
            <div>
              <label
                className="block text-gray-800 text-base"
                htmlFor="fullname"
              >
                First name
              </label>
              <input
                type="text"
                value={formData.firstName}
                placeholder="First Name"
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                id="fullname"
                className="w-full px-4 py-2 mt-2 border-2 text-base text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-800 text-base" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                placeholder="Email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                id="email"
                className="w-full px-4 py-2 mt-2 border-2 text-base text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
              />
            </div>
            <div className="mt-4">
              <label
                className="block text-gray-800 text-base"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                placeholder="Password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                id="password"
                className="w-full px-4 py-2 mt-2 border-2 text-base text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                autoComplete={formData.password}
              />
            </div>
            <div className="mt-6">
              {isSigningUp ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                <button
                  className="w-full px-4 py-2 bg-red-400 text-white font-semibold rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
                  onClick={handleSubmit}
                >
                  Create Account
                </button>
              )}
            </div>
          </form>
          <div className="mt-4 text-gray-800 text-base animate-fadeIn">
            Already have an account?{" "}
            <Link to="/login">
              <div className="text-red-500 text-base hover:underline inline">
                Log in
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
