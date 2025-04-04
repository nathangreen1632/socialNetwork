import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header(): React.JSX.Element {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        SocialNetwork
      </Link>

      <nav className="space-x-4">
        {isAuthenticated ? (
          <>
            <Link to="/feed" className="text-gray-700 hover:text-blue-500">
              Feed
            </Link>
            <Link to="/profile/me" className="text-gray-700 hover:text-blue-500">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-500">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-green-500">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
