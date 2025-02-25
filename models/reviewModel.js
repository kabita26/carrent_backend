const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  bookId: String,
  rating: Number,
});


  const Review = mongoose.model('Review', reviewSchema);
  module.exports = Review;
