import { applyMiddleware, legacy_createStore } from "redux";
import bookReducer from "./reducer";
import { thunk } from "redux-thunk";

const store = legacy_createStore(bookReducer, applyMiddleware(thunk));
export default store