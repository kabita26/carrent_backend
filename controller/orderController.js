const CarOrder = require("../models/orderModel");

// Create a new car order
const createCarOrder = async (req, res) => {
  try {
    const {
      carName,
      carBrand,
      carModel,
      year,
      totalPrice,
      orderType,
      carListingId,
      userId,
      pickupLocation,
      dropoffLocation,
      pickupTime,
      dropoffTime,
      rentalDays,
      fullName,
      phone,
      paymentOption,
    } = req.body;

    // Validate required fields
    if (
      !carName || !carBrand || !carModel || !year || !totalPrice || !orderType || !carListingId || 
      !userId || !pickupLocation || !dropoffLocation || !pickupTime || !dropoffTime || 
      !fullName || !phone || !paymentOption
    ) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    // Create a new order
    const newOrder = new CarOrder({
      carName,
      carBrand,
      carModel,
      year,
      totalPrice,
      orderType,
      carListingId,
      userId,
      pickupLocation,
      dropoffLocation,
      pickupTime,
      dropoffTime,
      rentalDays: orderType === "rent" ? rentalDays : null,
      fullName,
      phone,
      paymentOption,
      paymentStatus: "pending",
    });

    await newOrder.save();
    res.status(201).json({ message: "Car order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating car order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all car orders
const getAllCarOrders = async (req, res) => {
  try {
    const orders = await CarOrder.find().populate("carListingId", "name brand model year");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching car orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single car order by ID
const getCarOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await CarOrder.findById(id).populate("carListingId", "name brand model year");

    if (!order) {
      return res.status(404).json({ error: "Car order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching car order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createCarOrder, getAllCarOrders, getCarOrderById };
