import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Edit,
  Trash2,
  Calendar,
  BookmarkIcon,
  Copy,
  Hash,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { deleteBook, getBooks } from "../redux/action";

// Loader component
const Loader = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-5 rounded-lg shadow-lg flex items-center space-x-4">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
      <span className="text-lg font-medium">Loading...</span>
    </div>
  </div>
);

// Error component
const Error = ({ message }) => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded shadow-md">
    <div className="flex items-center">
      <div className="flex-shrink-0 text-red-500">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="ml-3">
        <p className="text-sm text-red-700">{message}</p>
      </div>
    </div>
  </div>
);

// Success component
const Success = ({ message }) => (
  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded shadow-md">
    <div className="flex items-center">
      <div className="flex-shrink-0 text-green-500">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="ml-3">
        <p className="text-sm text-green-700">{message}</p>
      </div>
    </div>
  </div>
);

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loading, error, success } = useSelector((state) => state);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8; // Increased from 6 to 8 since cards will be smaller

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id));
    }
  };

  // Filter books based on search term
  const filteredBooks =
    books?.filter(
      (book) =>
        book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {loading && <Loader />}
        {error && <Error message={error} />}
        {success && <Success message="Action was successful!" />}

        {/* Header Banner */}
        <div className="relative rounded-xl overflow-hidden mb-10 shadow-lg">
          <div className="h-48 bg-gradient-to-r from-indigo-800 to-purple-700"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">
                Your Book Collection
              </h1>
              <p className="text-indigo-100 text-lg md:max-w-2xl mx-auto">
                Explore, manage, and expand your personal library with ease
              </p>
            </div>
          </div>
        </div>

        {/* Book Collection Header and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <BookOpen className="mr-2 text-indigo-600" size={24} />
            Book Collection
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>

            <Link
              to="/add-book"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <span className="mr-2">Add New Book</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Book Cards */}
        {books && filteredBooks.length > 0 ? (
  <>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {currentBooks.map((book) => (
        <div
          key={book._id}
          className="transform transition duration-300 hover:scale-105"
        >
          <div className="relative h-full">
            {/* Book spine */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-indigo-700 to-indigo-600 rounded-l-md"></div>

            {/* Book cover */}
            <div className="ml-2 bg-white rounded-r-md shadow-md flex flex-col border border-gray-200">
              {/* Book Image */}
              <div className="p-2 pb-0">
                <div className="mb-2 aspect-[2/3] overflow-hidden rounded bg-indigo-100 flex items-center justify-center">
                  <img
                    src="https://images-eu.ssl-images-amazon.com/images/I/717Y82GZwWL._AC_UL600_SR600,400_.jpg"
                    alt="Book Cover"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Book Info */}
                <h3 className="text-sm font-semibold text-gray-800 mb-0.5 line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-600 italic mb-1 line-clamp-1">
                  by {book.author}
                </p>

                <div className="space-y-1 text-[11px] text-gray-700">
                  <div className="flex items-center">
                    <BookmarkIcon
                      className="mr-1 text-indigo-500 flex-shrink-0"
                      size={10}
                    />
                    <span className="line-clamp-1">
                      <span className="font-medium">Genre:</span>{" "}
                      {book.genre || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <Copy
                      className="mr-1 text-indigo-500 flex-shrink-0"
                      size={10}
                    />
                    <span>
                      <span className="font-medium">Copies:</span>{" "}
                      {book.copiesAvailable || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex justify-between items-center px-2 py-1 bg-gray-50 rounded-br-md border-t border-gray-200">
                <Link
                  to={`/edit-book/${book._id}`}
                  className="flex items-center text-indigo-600 hover:text-indigo-800 text-[11px] font-medium"
                >
                  <Edit className="mr-1" size={10} /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="flex items-center text-red-500 hover:text-red-700 text-[11px] font-medium"
                >
                  <Trash2 className="mr-1" size={10} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <nav className="flex items-center space-x-1">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`p-1.5 rounded-md flex items-center justify-center ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`w-8 h-8 rounded-md flex items-center justify-center ${
                          currentPage === number
                            ? "bg-indigo-600 text-white"
                            : "text-gray-700 hover:bg-indigo-50"
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}

                  <button
                    onClick={() =>
                      paginate(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`p-1.5 rounded-md flex items-center justify-center ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <BookOpen className="mx-auto text-5xl text-gray-400 mb-4" />
            <p className="text-xl font-medium text-gray-600 mb-5">
              No books found in your collection.
            </p>
            <Link
              to="/add-book"
              className="inline-block px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
            >
              Add Your First Book
            </Link>
          </div>
        )}

        {/* Quote Section */}
        <div className="text-center mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-indigo-700 mb-2">
            "The only thing you absolutely have to know is the location of the library."
          </h2>
          <p className="text-gray-600 italic mb-4">― Albert Einstein</p>
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Return Home
          </Link>
        </div>
      </div>


    </div>
  );
};

export default BookList;