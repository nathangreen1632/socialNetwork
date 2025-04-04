import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to SocialNetwork</h1>
      <p className="mb-6 text-gray-700">Connect with friends and share your thoughts.</p>
      <div className="space-x-4">
        <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</Link>
        <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Register</Link>
      </div>
    </div>
  );
};

export default HomePage;
