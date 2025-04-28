import {
  GET_BOOKS,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
  SET_LOADING,
  SET_ERROR,
  SET_SUCCESS,
} from "./actiontype";

const initialState = {
  books: [],
  loading: false,
  error: null,
  success: false,
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return { ...state, books: action.payload, loading: false };
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
        success: true,
      };
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book._id === action.payload._id ? action.payload : book
        ),
        success: true,
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book._id !== action.payload),
        success: true,
      };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_SUCCESS:
      return { ...state, success: action.payload };
    default:
      return state;
  }
};

export default bookReducer;
