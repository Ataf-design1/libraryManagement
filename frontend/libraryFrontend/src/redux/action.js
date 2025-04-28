import {
  GET_BOOKS,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
  SET_LOADING,
  SET_ERROR,
  SET_SUCCESS,
} from "./actiontype";

import axios from "axios";

const API_URL = "http://localhost:5000/api/books"; // Use your backend API URL

export const getBooks = () => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await axios.get(API_URL);
    dispatch({ type: GET_BOOKS, payload: response.data });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const addBook = (book) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await axios.post(API_URL, book);
    dispatch({ type: ADD_BOOK, payload: response.data });
    dispatch({ type: SET_SUCCESS, payload: "Book added successfully!" });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

export const updateBook = (id, updatedBook) => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedBook);
      dispatch({ type: UPDATE_BOOK, payload: response.data });
      dispatch({ type: SET_SUCCESS, payload: "Book updated successfully!" });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.message });
    }
  };
  

export const deleteBook = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({ type: DELETE_BOOK, payload: id });
    dispatch({ type: SET_SUCCESS, payload: "Book deleted successfully!" });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};
