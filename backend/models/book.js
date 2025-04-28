import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: String, required: true },
  publishedDate: { type: String, required: true },
  genre: String,
  copiesAvailable: { type: Number, default: 1 },
});

let Book = mongoose.model('Book', bookSchema);
export default Book;
