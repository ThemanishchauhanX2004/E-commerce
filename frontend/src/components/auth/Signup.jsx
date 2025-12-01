// components/auth/Signup.jsx
import { useState } from "react";

export default function Signup({
  form,
  setForm,
  handleSignup,
  passwordError,
  showPassword,
  setShowPassword,
}) {
  const validatePassword = (value) => {
    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!strongPassword.test(value)) {
      return "Password must include uppercase, lowercase, number & special char";
    }
    return "";
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Signup</h2>

      <div className="grid gap-4">
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="First Name"
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />

        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Last Name"
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />

        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, userName: e.target.value })}
        />

        <div className="relative">
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
          />

          {/* Eye Icon */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl select-none"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {passwordError && (
          <p className="text-red-500 text-sm">{passwordError}</p>
        )}

        <div className="flex flex-col gap-2">
          <label className="font-medium">Profile Picture</label>
          <input
            type="file"
            className="border border-gray-300 rounded-lg px-3 py-2"
            onChange={(e) =>
              setForm({ ...form, picture: e.target.files[0] })
            }
          />
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleSignup}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

