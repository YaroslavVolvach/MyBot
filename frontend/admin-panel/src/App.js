// App.js

import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotifyForm from './components/NotifyForm';
import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/notifications"
          element={isAuthenticated ? <NotifyForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/users"
          element={isAuthenticated ? <UserList /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-user"
          element={isAuthenticated ? <AddUserForm /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
