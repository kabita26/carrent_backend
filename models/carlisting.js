const mongoose = require('mongoose')

const carlistingSchem = new mongoose.Schema({
   name: { type: String, required: true },
   brand: { type: String, required: true },
   model: { type: String, required: true },
   year: { type: Number, required: true },
   fuelType: { type: String, required: true },
   carManufacturer: { type: String, required: true },
   description: { type: String, required: true },
   address: { type: String, required: true },
   regularPrice: { type: Number, required: true },
   discountPrice: { type: Number },
   offer: { type: String },
   parking: { type: Boolean, required: true },
   type: { type: String, required: true }, // 'rent' or 'sale'
   driveType: { type: String, required: true },
   seatingCapacity: { type: Number, required: true },
   imageUrls: [String], // Array of URLs
}, { timestamps: true });

const carlistingModel = mongoose.model(" Carlisting",carlistingSchem);
module.exports=carlistingModel;