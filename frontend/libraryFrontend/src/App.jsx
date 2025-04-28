import React from "react";
import AddBookForm from "./components/AddBookForm";
import BookList from "./components/Booklist";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditBookForm from "./components/EditBookForm";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Route for Book List page */}
          <Route path="/" element={<BookList />} />

          {/* Route for Add Book Form page */}
          <Route path="/add-book" element={<AddBookForm />} />

          {/* Route for Edit Book Form page */}
          <Route path="/edit-book/:id" element={<EditBookForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
