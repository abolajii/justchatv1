import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-lg font-bold">MyApp</div>
      <div className="flex space-x-4">
        <Link to="/" className="btn btn-primary">
          Home
        </Link>
        <Link to="/login" className="btn btn-secondary">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
