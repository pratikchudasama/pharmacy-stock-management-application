import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userImage from "../assets/user.png";

const MainMenu = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const handleStockClick = () => {
    navigate("/stock");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl p-8 md:p-10 bg-white rounded-lg shadow-lg relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute top-4 left-4 focus:outline-none text-gray-600 hover:text-gray-800"
          title="Menu"
        >
          <span className="text-3xl">☰</span>
        </button>

        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 text-red-600 hover:text-red-400 underline focus:outline-none"
          title="Sign Out"
        >
          Sign Out
        </button>

        {menuOpen && (
          <div className="absolute left-4 mt-2 w-48 bg-white rounded-lg shadow-md">
            <button
              onClick={handleStockClick}
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-100"
            >
              Stock
            </button>
            <button
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-100"
              disabled
            >
              Reports
            </button>
            <button
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-100"
              disabled
            >
              Orders
            </button>
            <button
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-100"
              disabled
            >
              Products
            </button>
          </div>
        )}

        <div className="flex justify-center mb-6">
          <img
            src={userImage}
            alt="User"
            className="h-32 w-32 rounded-full shadow-md"
          />
        </div>

        <h2 className="mb-4 text-3xl font-bold text-center text-gray-800">
          {userName}
        </h2>
        <p className="mb-8 text-center text-gray-600">{userEmail}</p>

        <div className="space-y-6">
          <button
            onClick={handleStockClick}
            className="w-full px-6 py-3 font-bold bg-blue-950 hover:bg-blue-900 text-white rounded-md focus:outline-none transition-all"
          >
            Stock
          </button>
          <button
            className="w-full px-6 py-3 font-bold bg-gray-400 text-white rounded-md focus:outline-none cursor-not-allowed"
            disabled
          >
            Reports
          </button>
          <button
            className="w-full px-6 py-3 font-bold bg-gray-400 text-white rounded-md focus:outline-none cursor-not-allowed"
            disabled
          >
            Orders
          </button>
          <button
            className="w-full px-6 py-3 font-bold bg-gray-400 text-white rounded-md focus:outline-none cursor-not-allowed"
            disabled
          >
            Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
