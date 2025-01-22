const express = require('express');
const router = express.Router();
const cors = require('cors');

const { registerUser, loginUser, forgotPassword, resetPassword } = require('../controller/authController');
const {
  car,
  getAllCars,
  getById,
  updateById,
  deleteById,
  searchCars,
  getByType,
  getByBrand,
} = require('../controller/carController');
const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  calculateTotalCost,
} = require('../controller/shoppingCartController');
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require('../controller/wishListController');
const {
  createCarOrder,
  getAllCarOrders,
  getCarOrderById,
  updateCarPaymentStatus,
} = require('../controller/orderController');

// Define the test route handler
const test = (req, res) => {
  res.status(200).send("API is working!");
};

// Enable CORS for a specific origin
router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

// Test route
router.get('/', test);

// Authentication routes
router.post('/register', registerUser); // Register with profile picture upload
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
// Car routes
router.post('/upload-car', car);
router.get('/carlisting', getAllCars);
router.get('/carlisting/:id', getById);
router.put('/car_update/:id', updateById);
router.delete('/car/:id', deleteById);
router.get('/car/search', searchCars);

// Cart routesrouter.post('/cart/add', addToCart);
router.put('/cart/update-quantity', updateCartItemQuantity);
router.delete('/cart/remove', removeFromCart);
router.get('/cart/total-cost', calculateTotalCost);

// Wishlist routes
router.post('/wishlist/add', addToWishlist);
router.delete('/wishlist/remove', removeFromWishlist);
router.get('/wishlist', getWishlist);

// Order routes
router.post('/checkout', createCarOrder);
router.get('/checkout/all', getAllCarOrders);
router.get('/checkout/:id', getCarOrderById);

module.exports = router;
