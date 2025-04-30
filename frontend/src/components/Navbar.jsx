import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPlus , FaBookOpen } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className=" bg-indigo-900 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <Link
            to="/"
            className="flex items-center space-x-3 text-white hover:text-gray-300 transition duration-300"
          >
            
            <FaHome className="text-xl" />
            <span className="font-bold text-xl">Librio</span>
          </Link>

          {/* Navbar Links */}
          <div className="flex space-x-4">
            <Link
              to="/"
              className="flex items-center px-3 py-2 rounded text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300"
            >
              <FaHome className="mr-2" />
              <span>Home</span>
            </Link>
            <Link
              to="/book-list"
              className="flex items-center px-3 py-2 rounded text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300"
            >
              <FaBookOpen className="mr-2"/>
              <span>Book list</span>
            </Link>

            <Link
              to="/add-book"
              className="flex items-center px-3 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition duration-300"
            >
              <FaPlus className="mr-2" />
              <span>Add Book</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
