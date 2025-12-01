import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import ProfileView from "./ProfileView";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    picture: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch profile info if logged in
    async function fetchProfile() {
      try {
        const res = await fetch("https://e-commerce-1-km7j.onrender.com/profile", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.user) {
          setIsLoggedIn(true);
          setLoggedInUser(data.user);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    }
    fetchProfile();
  }, [dispatch]);

  const handleSignup = async () => {
    // TODO: Add signup logic
  };

  const handleLogin = async () => {
    // TODO: Add login logic
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("https://e-commerce-1-km7j.onrender.com/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setIsLoggedIn(false);
        setLoggedInUser(null);
        dispatch({ type: "set-cart", payload: { products: [], totalPrice: 0, totalShipping: 0 } });
        navigate("/");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // =========================
  // RENDERING
  // =========================

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
          <Signup
            form={form}
            setForm={setForm}
            handleSignup={handleSignup}
            passwordError={passwordError}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <div className="my-4 border-t border-gray-300"></div>
          <Login
            form={form}
            setForm={setForm}
            handleLogin={handleLogin}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <ProfileView
          loggedInUser={loggedInUser}
          handleLogout={handleLogout}
          navigate={navigate}
          setEditMode={setEditMode}
        />

        {/* Edit Modal */}
        {editMode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
              <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
              {/* Add your edit profile form fields here */}
              <button
                onClick={() => setEditMode(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold"
              >
                ✕
              </button>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="file"
                  onChange={(e) => setForm({ ...form, picture: e.target.files[0] })}
                  className="w-full"
                />
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-bold"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
