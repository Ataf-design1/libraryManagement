import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Error from "./Error";
import Success from "./Success";
import { deleteBook, getBooks } from "../redux/action";
import { Link } from "react-router-dom";
import { FaBook, FaEdit, FaTrash, FaCalendarAlt, FaBookmark, FaCopy, FaHashtag } from "react-icons/fa";

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loading, error, success } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {loading && <Loader />}
      {error && <Error message={error} />}
      {success && <Success message="Action was successful!" />}

      {/* Header Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-16 shadow-lg">
        <img 
          src="https://img.freepik.com/free-vector/hand-drawn-world-book-day-sale-horizontal-banner_23-2149307135.jpg?semt=ais_hybrid&w=740" 
         
          className="w-full h-80 object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold text-center px-6">
            Welcome to Your Book Collection 📚
          </h1>
        </div>
      </div>

      {/* Quotes Section */}
      <div className="text-center mb-16 space-y-8">
        <h2 className="text-4xl font-bold text-indigo-700">✨ "A room without books is like a body without a soul." ✨</h2>
        <p className="text-lg text-gray-600 italic">― Marcus Tullius Cicero</p>
        <h2 className="text-3xl font-semibold text-purple-700">📖 "Books are a uniquely portable magic." 📖</h2>
        <p className="text-md text-gray-500 italic">― Stephen King</p>
      </div>

      {/* Book Collection Title */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-extrabold text-gray-800 flex items-center">
          <FaBook className="mr-3 text-indigo-600" />
          Book Collection
        </h2>
        <Link 
          to="/add-book" 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Add New Book
        </Link>
      </div>

      {/* Book Cards */}
      
      {books && books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {books.map((book) => (
            <div key={book._id} className="p-4">
              <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-transform duration-300 h-full flex flex-col justify-between border border-gray-300">
                <div className="p-6">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf6moVt7jcI-wL3NiiQF5p2x4RO-8AiLZZ1A&s" 
                    alt="Book Cover" 
                    className="w-full h-64 object-cover rounded-xl mb-6"
                  />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-1 text-center">{book.title}</h3>
                  <p className="text-md text-gray-600 italic text-center mb-4">by {book.author}</p>

                  <div className="space-y-4 text-gray-700">
                    <div className="flex items-center">
                      <FaHashtag className="mr-2 text-indigo-500" />
                      <span><strong>ISBN:</strong> {book.ISBN || "N/A"}</span>
                    </div>

                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-indigo-500" />
                      <span><strong>Published:</strong> {book.publishedDate || "N/A"}</span>
                    </div>

                    <div className="flex items-center">
                      <FaBookmark className="mr-2 text-indigo-500" />
                      <span><strong>Genre:</strong> {book.genre || "N/A"}</span>
                    </div>

                    <div className="flex items-center">
                      <FaCopy className="mr-2 text-indigo-500" />
                      <span><strong>Copies:</strong> {book.copiesAvailable || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center px-6 py-4 bg-indigo-100 rounded-b-2xl">
                  <Link 
                    to={`/edit-book/${book._id}`}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 font-semibold"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(book._id)}
                    className="flex items-center text-red-500 hover:text-red-700 font-semibold"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl shadow-inner">
          <FaBook className="mx-auto text-6xl text-gray-400 mb-5" />
          <p className="text-2xl font-semibold text-gray-600">No books found in your collection.</p>
          <Link to="/add-book" className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:scale-105 transition-transform duration-300">
            Add Your First Book
          </Link>
        </div>
      )}

     

      {/* Closing Inspiration Section */}
      <div className="text-center mt-16 bg-gradient-to-r from-indigo-100 to-purple-100 p-10 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-4xl font-bold text-indigo-700">📚 "The only thing you absolutely have to know is the location of the library." 📚</h2>
        <p className="text-md text-gray-600 italic">― Albert Einstein</p>
        <a 
          
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition"
        >
          Explore More Book Designs
        </a>
      </div>
    </div>
  );
};

export default BookList;
