import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'; 
import { getBooks, updateBook } from '../redux/action';
import { FaBook, FaUser, FaHashtag, FaCalendarAlt, FaBookmark, FaCopy, FaSave, FaExclamationTriangle, FaEdit } from 'react-icons/fa';

const EditBookForm = () => {
  const { id } = useParams();  // Fetch the book ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { books, success, error } = useSelector(state => state); // Get success and error from redux
  
  const book = books.find(book => book._id === id);  // Find the book by ID
  
  const [title, setTitle] = useState(book?.title || '');
  const [author, setAuthor] = useState(book?.author || '');
  const [isbn, setIsbn] = useState(book?.ISBN || '');
  const [publishedDate, setPublishedDate] = useState(book?.publishedDate || '');
  const [genre, setGenre] = useState(book?.genre || '');
  const [copiesAvailable, setCopiesAvailable] = useState(book?.copiesAvailable || 1); // Default to 1
  const [formError, setFormError] = useState('');  // Use this for form validation error

  useEffect(() => {
    if (!book) {
      dispatch(getBooks());  // Fetch books if not loaded yet
    }
  }, [book, dispatch]);

  useEffect(() => {
    // Navigate if update is successful
    if (success) {
      navigate('/');  // Navigate to Book List page
    }
  }, [success, navigate]);

  // Update form fields when book data is loaded
  useEffect(() => {
    if (book) {
      setTitle(book.title || '');
      setAuthor(book.author || '');
      setIsbn(book.ISBN || '');
      setPublishedDate(book.publishedDate || '');
      setGenre(book.genre || '');
      setCopiesAvailable(book.copiesAvailable || 1);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !isbn || !publishedDate) {
      setFormError('Title, Author, ISBN, and Published Date are required.');
      return;
    }

    const updatedBook = { 
      _id: id, 
      title, 
      author, 
      ISBN: isbn, 
      publishedDate, 
      genre, 
      copiesAvailable: parseInt(copiesAvailable) || 0
    };

    dispatch(updateBook(id, updatedBook)); // Pass id and updated book
  };

  if (!book) {
    return (
      <div className=" flex justify-center items-center h-64">
        <div className="text-center text-gray-600">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading book data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" mt-5 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaEdit className="mr-2 text-blue-600" />
        Edit Book
      </h2>
      
      {formError && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-red-500 mr-2" />
            <p className="text-red-700">{formError}</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="flex items-center text-gray-700 font-medium">
            <FaBook className="mr-2 text-blue-500" />
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="author" className="flex items-center text-gray-700 font-medium">
            <FaUser className="mr-2 text-blue-500" />
            Author
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="isbn" className="flex items-center text-gray-700 font-medium">
            <FaHashtag className="mr-2 text-blue-500" />
            ISBN
          </label>
          <input
            type="text"
            id="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="Enter ISBN"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="publishedDate" className="flex items-center text-gray-700 font-medium">
            <FaCalendarAlt className="mr-2 text-blue-500" />
            Published Date
          </label>
          <input
            type="text"
            id="publishedDate"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            placeholder="Enter published date (e.g., 2023-01-15)"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="genre" className="flex items-center text-gray-700 font-medium">
            <FaBookmark className="mr-2 text-blue-500" />
            Genre
          </label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Enter genre (optional)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="copiesAvailable" className="flex items-center text-gray-700 font-medium">
            <FaCopy className="mr-2 text-blue-500" />
            Copies Available
          </label>
          <input
            type="number"
            id="copiesAvailable"
            value={copiesAvailable}
            onChange={(e) => setCopiesAvailable(e.target.value)}
            min="0"
            placeholder="Enter copies available"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
        
        <div className="flex space-x-4">
          <button 
            type="submit" 
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition flex items-center justify-center font-medium"
          >
            <FaSave className="mr-2" />
            Update Book
          </button>
          
          <button 
            type="button"
            onClick={() => navigate('/')} 
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none transition flex items-center justify-center font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBookForm;