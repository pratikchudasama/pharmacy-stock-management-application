import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainMenu from './components/MainMenu';
import StockPage from './components/StockPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  // Synchronize state with localStorage when isLoggedIn changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/main-menu" /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/main-menu"
          element={isLoggedIn ? <MainMenu setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />}
        />
        <Route
          path="/stock"
          element={isLoggedIn ? <StockPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
