import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Retrieve stored users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    console.log("Looking for:", formData.email);
    console.log("Stored Users:", storedUsers);

    // Find the user by email (case insensitive)
    const foundUser = storedUsers.find(
      (user) => user.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (!foundUser) {
      setError("User not found. Please check your email.");
      return;
    }

    // Compare passwords (exact match)
    console.log("Entered password:", formData.password);
    console.log("Stored password:", foundUser.password);
    
    if (foundUser.password !== formData.password) {
      setError("Incorrect password. Try again.");
      return;
    }

    // Store the logged-in user and navigate
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    navigate("/home");
  };

  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {error && (
          <div className="p-2 mb-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg pr-10 focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup1")}
            className="text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}