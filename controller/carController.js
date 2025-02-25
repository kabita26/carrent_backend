const Carlisting = require('../models/carlisting');  // Adjusted model import

// Get all car listings
const getAllCars = async (req, res) => {
    let cars;
    try {
        cars = await Carlisting.find();
    } catch (err) {
        console.log(err);
    }
    if (!cars) {
        return res.status(404).json({ message: "No cars found" });
    }
    return res.status(200).json({ cars });
};

// Add a new car listing
const car = async (req, res) => {
    try {
        const { name, brand, model, year, fuelType, carManufacturer, description, address, regularPrice, discountPrice, offer, parking, type, driveType, seatingCapacity, imageUrls } = req.body;

        // Creating a new car listing using the Carlisting model
        const carlisting = await Carlisting.create({
            name,
            brand,
            model,
            year,
            fuelType,
            carManufacturer,
            description,
            address,
            regularPrice,
            discountPrice,
            offer,
            parking,
            type,
            driveType,
            seatingCapacity,
            imageUrls
        });

        // Sending the created car listing as the response
        res.send(carlisting);
    } catch (error) {
        console.error('Error uploading car:', error);
        res.status(500).json({ error: 'An error occurred while uploading the car' });
    }
};

// Get car by ID
const getById = async (req, res) => {
    try {
        const id = req.params.id;

        // Find the car by ID using the Carlisting model
        const car = await Carlisting.findById(id);

        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        // Send the car as the response
        res.send(car);
    } catch (error) {
        console.error('Error getting car by ID:', error);
        res.status(500).json({ error: 'An error occurred while getting the car by ID' });
    }
};

// Update car by ID
const updateById = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, brand, model, year, fuelType, carManufacturer, description, address, regularPrice, discountPrice, offer, parking, type, driveType, seatingCapacity, imageUrls } = req.body;

        // Find the car by ID and update it using the Carlisting model
        const car = await Carlisting.findByIdAndUpdate(id, {
            name,
            brand,
            model,
            year,
            fuelType,
            carManufacturer,
            description,
            address,
            regularPrice,
            discountPrice,
            offer,
            parking,
            type,
            driveType,
            seatingCapacity,
            imageUrls
        });

        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        // Send the updated car as the response
        res.send(car);
    } catch (error) {
        console.error('Error updating car by ID:', error);
        res.status(500).json({ error: 'An error occurred while updating the car by ID' });
    }
};

// Delete car by ID
const deleteById = async (req, res) => {
    try {
        const id = req.params.id;

        // Find the car by ID and delete it using the Carlisting model
        const deletedCar = await Carlisting.findByIdAndDelete(id);

        if (!deletedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }

        // Send a success message as the response
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error('Error deleting car by ID:', error);
        res.status(500).json({ error: 'An error occurred while deleting the car by ID' });
    }
};

// Search cars based on a search term (e.g., name, brand, model)
const searchCars = async (req, res) => {
    try {
        const { searchTerm } = req.query;

        if (!searchTerm) {
            return res.status(400).json({ error: 'Search term is required' });
        }

        const regex = new RegExp(searchTerm, 'i');
        const cars = await Carlisting.find({
            $or: [
                { name: regex },
                { brand: regex },
                { model: regex },
            ],
        });

        if (!cars || cars.length === 0) {
            return res.status(404).json({ message: 'No matching cars found' });
        }

        return res.status(200).json({ cars });
    } catch (error) {
        console.error('Error searching cars:', error);
        res.status(500).json({ error: 'An error occurred while searching for cars' });
    }
};

// Get cars by type (e.g., 'rent' or 'sale')
const getByType = async (req, res) => {
    try {
        const { type } = req.params;

        if (!type) {
            return res.status(400).json({ error: 'Type is required' });
        }

        const cars = await Carlisting.find({ type: type });

        if (!cars || cars.length === 0) {
            return res.status(404).json({ message: 'No cars found in the specified type' });
        }

        res.json({ cars });
    } catch (error) {
        console.error('Error fetching cars by type:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get cars by brand
const getByBrand = async (req, res) => {
    try {
        const { brand } = req.params;

        if (!brand) {
            return res.status(400).json({ error: 'Brand is required' });
        }

        const cars = await Carlisting.find({ brand: brand });

        if (!cars || cars.length === 0) {
            return res.status(404).json({ message: 'No cars found for the specific brand' });
        }

        res.json({ cars });
    } catch (error) {
        console.error('Error fetching cars by brand:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    car,
    getAllCars,
    getById,
    updateById,
    deleteById,
    searchCars,
    getByType,
    getByBrand,
};
