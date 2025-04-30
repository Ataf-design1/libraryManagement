import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Users, Mail, Star, Search, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Book image URLs
  const bookImages = [
    "https://images-eu.ssl-images-amazon.com/images/I/91qO2eExLLL._AC_UL600_SR600,400_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/I/81EWGoc3ZgL._AC_UL600_SR600,400_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/I/91reLa1QXoL._AC_UL600_SR600,400_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/I/71+oHMoJ8cL._AC_UL600_SR600,400_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/I/81GKSai2WNL._AC_UL600_SR600,400_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/I/91gRoqnxQIL._AC_UL600_SR600,400_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/I/81Dky+tD+pL._AC_UL600_SR600,400_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/I/91EUa7dUPXL._AC_UL600_SR600,400_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/I/51xhnh+bmbL._AC_UL600_SR600,400_.jpg"
  ];

  // Sample data for books
  const popularBooks = [
    { title: "The Silent Patient", author: "Alex Michaelides", image: bookImages[0] },
    { title: "Where the Crawdads Sing", author: "Delia Owens", image: bookImages[1] },
    { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", image: bookImages[2] },
    { title: "Atomic Habits", author: "James Clear", image: bookImages[3] },
    { title: "It Ends with Us", author: "Colleen Hoover", image: bookImages[4] },
    { title: "The Thursday Murder Club", author: "Richard Osman", image: bookImages[5] },
    { title: "A Little Life", author: "Hanya Yanagihara", image: bookImages[6] },
    { title: "The Midnight Library", author: "Matt Haig", image: bookImages[7] },
    { title: "The Psychology of Money", author: "Morgan Housel", image: bookImages[8] },
  ];

  const newReleases = [
    { title: "The Rose Code", author: "Kate Quinn", image: bookImages[0] },
    { title: "Project Hail Mary", author: "Andy Weir", image: bookImages[1] },
    { title: "The Last Thing He Told Me", author: "Laura Dave", image: bookImages[2] },
    { title: "The Four Winds", author: "Kristin Hannah", image: bookImages[3] },
    { title: "Klara and the Sun", author: "Kazuo Ishiguro", image: bookImages[4] },
    { title: "The Push", author: "Ashley Audrain", image: bookImages[5] },
  ];

  // Custom carousel state and controls
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 3;

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === newReleases.length - slidesToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? newReleases.length - slidesToShow : prev - 1
    );
  };

  // Auto-scrolling marquee effect for popular books
  const [marqueePosition, setMarqueePosition] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMarqueePosition((prev) => {
        if (prev <= -100) return 0;
        return prev - 0.1;
      });
    }, 16);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
    

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-indigo-800 to-purple-700 text-white py-16 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to the Library</h1>
          <p className="text-xl md:text-2xl mb-8">Your Gateway to Knowledge and Imagination</p>
          <div className="flex justify-center gap-4">
            <Link to='/book-list' className="bg-white text-indigo-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
              Explore Books
            </Link>
            <button className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition">
              Become a Member
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">About Our Library</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 mb-6">
              We offer a wide range of books across various genres to readers of all ages. 
              Our library is designed to be a sanctuary for book lovers and a gateway to 
              knowledge for curious minds.
            </p>
            <p className="text-lg text-gray-700">
              With thousands of titles spanning fiction, non-fiction, reference materials, 
              and digital resources, we're committed to fostering a love of reading and 
              lifelong learning in our community.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Books Marquee */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Books</h2>
            <a href="#" className="text-indigo-600 hover:text-indigo-800 flex items-center">
              View all
              <ChevronRight size={18} className="ml-1" />
            </a>
          </div>
          
          <div className="relative overflow-hidden py-4">
            <div 
              className="flex space-x-6"
              style={{ transform: `translateX(${marqueePosition}%)` }}
            >
              {[...popularBooks, ...popularBooks].map((book, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-48 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                >
                  <div className="h-64 overflow-hidden relative group">
                    <img 
                      src={book.image} 
                      alt={book.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <p className="font-medium text-sm">{book.title}</p>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white rounded-full p-1 text-indigo-700 hover:bg-indigo-100">
                        <Star size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold truncate text-gray-800">{book.title}</h3>
                    <p className="text-gray-600 text-sm">{book.author}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex text-yellow-500">
                        <Star className="fill-current" size={12} />
                        <Star className="fill-current" size={12} />
                        <Star className="fill-current" size={12} />
                        <Star className="fill-current" size={12} />
                        <Star className="text-gray-300" size={12} />
                      </div>
                      <button className="text-xs text-indigo-600 hover:text-indigo-800">Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recently Released Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Recently Released</h2>
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="bg-gray-100 hover:bg-indigo-100 p-2 rounded-lg text-indigo-800 transition"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="bg-gray-100 hover:bg-indigo-100 p-2 rounded-lg text-indigo-800 transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * (100 / newReleases.length)}%)` }}
              >
                {newReleases.map((book, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-full md:w-1/3 px-4"
                  >
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="relative h-80 overflow-hidden">
                        <div className="absolute top-0 left-0 bg-indigo-600 text-white px-3 py-1 rounded-br-lg text-xs font-medium z-10">
                          NEW
                        </div>
                        <img 
                          src={book.image} 
                          alt={book.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-bold text-lg mb-1 drop-shadow-md">{book.title}</h3>
                          <p className="text-gray-200 drop-shadow-md">{book.author}</p>
                        </div>
                      </div>
                      <div className="p-5 bg-white">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <Star className="text-yellow-500 fill-current" size={16} />
                            <Star className="text-yellow-500 fill-current" size={16} />
                            <Star className="text-yellow-500 fill-current" size={16} />
                            <Star className="text-yellow-500 fill-current" size={16} />
                            <Star className="text-gray-300" size={16} />
                            <span className="ml-1 text-gray-600 text-sm">(48)</span>
                          </div>
                          <span className="text-green-600 font-medium">Available</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                          An enthralling new release that captivates readers with its unique storyline and compelling characters.
                        </p>
                        <div className="flex justify-between items-center">
                          <button className="flex items-center text-indigo-600 text-sm font-medium hover:text-indigo-800">
                            <Search size={16} className="mr-1" />
                            Quick view
                          </button>
                          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center text-sm hover:bg-indigo-700 transition">
                            <ShoppingCart size={16} className="mr-1" />
                            Reserve
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            {newReleases.slice(0, Math.ceil(newReleases.length / slidesToShow)).map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx * slidesToShow)}
                className={`mx-1 w-2 h-2 rounded-full ${currentSlide === idx * slidesToShow ? 'bg-indigo-600' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Readers Say</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-500">
                  <Star className="fill-current" size={18} />
                  <Star className="fill-current" size={18} />
                  <Star className="fill-current" size={18} />
                  <Star className="fill-current" size={18} />
                  <Star className="fill-current" size={18} />
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "An excellent collection of books. The staff is knowledgeable and the atmosphere is perfect for reading. Highly recommended!"
              </p>
              <p className="font-medium">— Sarah Johnson</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-500">
                  <Star className="fill-current" size={18} />
                  <Star className="fill-current" size={18} />
                  <Star className="fill-current" size={18} />
                  <Star className="fill-current" size={18} />
                  <Star className="fill-current" size={18} />
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "This library helped me rediscover my love for reading. The online reservation system is convenient and the selection is fantastic."
              </p>
              <p className="font-medium">— Michael Thompson</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Links */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Links</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <a href="#" className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-indigo-50 transition group">
              <BookOpen size={32} className="text-indigo-600 mb-3" />
              <span className="font-medium group-hover:text-indigo-600">Browse All Books</span>
            </a>
            
            <a href="#" className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-indigo-50 transition group">
              <Users size={32} className="text-indigo-600 mb-3" />
              <span className="font-medium group-hover:text-indigo-600">Membership Plans</span>
            </a>
            
            <a href="#" className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-indigo-50 transition group">
              <Mail size={32} className="text-indigo-600 mb-3" />
              <span className="font-medium group-hover:text-indigo-600">Contact Us</span>
            </a>
            
            <a href="#" className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-indigo-50 transition group">
              <Star size={32} className="text-indigo-600 mb-3" />
              <span className="font-medium group-hover:text-indigo-600">Support</span>
            </a>
          </div>
        </div>
      </section>

    
     
    </div>
  );
};

export default Home;