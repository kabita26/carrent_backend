const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Carlisting', required: true }, // Link to Car
  carName: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  imageURL: { type: String, required: true },
}, { timestamps: true });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
