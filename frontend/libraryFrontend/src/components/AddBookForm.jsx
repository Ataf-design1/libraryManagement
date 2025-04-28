import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/action';
import { FaBook, FaUser, FaHashtag, FaCalendarAlt, FaBookmark, FaCopy, FaSave, FaExclamationTriangle } from 'react-icons/fa';

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [genre, setGenre] = useState('');
  const [copiesAvailable, setCopiesAvailable] = useState(1); // Default to 1
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !isbn || !publishedDate) {
      setError('Title, Author, ISBN, and Published Date are required.');
      return;
    }
    
    const newBook = {
      title,
      author,
      ISBN: isbn,
      publishedDate,
      genre,
      copiesAvailable,
    };
    
    dispatch(addBook(newBook));
    
    // Reset the form
    setTitle('');
    setAuthor('');
    setIsbn('');
    setPublishedDate('');
    setGenre('');
    setCopiesAvailable(1);
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaBook className="mr-2 text-blue-600" />
        Add New Book
      </h2>
      
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
            onChange={(e) => setCopiesAvailable(parseInt(e.target.value) || 0)}
            min="0"
            placeholder="Enter copies available"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition flex items-center justify-center font-medium"
        >
          <FaSave className="mr-2" />
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;