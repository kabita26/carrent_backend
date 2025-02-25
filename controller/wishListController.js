const Wishlist = require("../models/wishlistModel");

// Get all wishlist items for a user
const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const wishlist = await Wishlist.find({ userId }).populate("carId", "name brand price imageUrls");

    res.json({ wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add a car to the wishlist
const addToWishlist = async (req, res) => {
  try {
    const { userId, carId, carName, brand, price, imageURL } = req.body;

    const existingWishlistItem = await Wishlist.findOne({ userId, carId });
    if (existingWishlistItem) {
      return res.status(400).json({ error: "Car already in the wishlist" });
    }

    const wishlistItem = new Wishlist({ userId, carId, carName, brand, price, imageURL });

    await wishlistItem.save();

    res.json({ message: "Car added to wishlist" });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Remove a car from the wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { userId, carId } = req.body;

    const result = await Wishlist.findOneAndDelete({ userId, carId });

    if (!result) {
      return res.status(404).json({ error: "Wishlist item not found" });
    }

    res.json({ message: "Car removed from wishlist" });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
