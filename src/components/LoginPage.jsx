import { useState } from "react";
import { useNavigate } from "react-router-dom";
import companyLogo from "../assets/banner_center.png";

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setError("");

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    if (email === "john.doe@mclernons.ie" && password === "password123") {
      setIsLoggedIn(true);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", "John Doe");
      navigate("/main-menu");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 md:p-10 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={companyLogo} alt="Company Logo" className="h-28 w-auto" />
        </div>
        <h2 className="mb-4 text-3xl font-bold text-gray-800 text-center">
          Sign In
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Hi there! Nice to see you again.
        </p>
        {error && <p className="mb-4 text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 border-b border-slate-600 hover:shadow-md focus:outline-none"
              placeholder="Enter your email"
              required
            />
            {emailError && (
              <p className="mt-2 text-red-500 text-sm">{emailError}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 border-b border-slate-600 hover:shadow-md focus:outline-none"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-600 focus:outline-none"
              >
                {showPassword ? "🚫" : "👁️"}
              </button>
            </div>
            {passwordError && (
              <p className="mt-2 text-red-500 text-sm">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 font-bold bg-blue-950 hover:bg-blue-900 text-white rounded-md focus:outline-none"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
