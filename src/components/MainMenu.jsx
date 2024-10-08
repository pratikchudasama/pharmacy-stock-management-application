import React from "react";
import { useNavigate } from "react-router-dom";
import userImage from '../assets/user.png'

const MainMenu = ({setIsLoggedIn}) => {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        navigate('/');
    }

    const handleStockClick = () => {
        navigate('/stock'); 
    }

    return(
        <div>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src={userImage} alt="User" className="h-28 w-28 rounded-full" />
        </div>
        <h2 className="mb-2 text-2xl text-center text-gray-800">{userName}</h2>
        <p className="mb-6 text-center text-gray-600">{userEmail}</p>
        <div className="space-y-4">
          <button
            onClick={handleStockClick}
            className="w-full px-4 py-2 font-bold bg-blue-950 hover:bg-blue-900 text-white rounded-md focus:outline-none"
          >
            Stock
          </button>
          <button
            className="w-full px-4 py-2 font-bold bg-gray-400 text-white rounded-md focus:outline-none cursor-not-allowed"
            disabled
          >
            Reports
          </button>
          <button
            className="w-full px-4 py-2 font-bold bg-gray-400 text-white rounded-md focus:outline-none cursor-not-allowed"
            disabled
          >
            Orders
          </button>
          <button
            className="w-full px-4 py-2 font-bold bg-gray-400 text-white rounded-md focus:outline-none cursor-not-allowed"
            disabled
          >
            Products
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="w-full mt-6 px-4 py-2 font-bold text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white focus:outline-none"
        >
          Logout
        </button>
      </div>
    </div>
        </div>
    )
}
    

export default MainMenu;