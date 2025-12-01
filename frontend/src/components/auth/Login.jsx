// components/auth/Login.jsx
import { useState } from "react";

export default function Login({
  form,
  setForm,
  handleLogin,
  showPassword,
  setShowPassword,
}) {
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

      <div className="grid gap-4">
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
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {/* Eye Icon */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl select-none"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
