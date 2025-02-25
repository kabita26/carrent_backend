const mongoose = require("mongoose");

const carOrderSchema = new mongoose.Schema(
  {
    carName: { type: String, required: true },
    carBrand: { type: String, required: true },
    carModel: { type: String, required: true },
    year: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    orderType: { type: String, enum: ["purchase", "rent"], required: true },
    carListingId: { type: mongoose.Schema.Types.ObjectId, ref: "Carlisting", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Rental Details
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    pickupTime: { type: Date, required: true },
    dropoffTime: { type: Date, required: true },
    rentalDays: {
      type: Number,
      required: function () {
        return this.orderType === "rent";
      },
    },

    // Customer Details
    fullName: { type: String, required: true },
    phone: { type: String, required: true },

    // Payment Details
    paymentOption: { type: String, enum: ["COD", "Pay now"], required: true },
    paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },

    // Order Timestamp
    orderDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const CarOrder = mongoose.model("CarOrder", carOrderSchema);
module.exports = CarOrder;
