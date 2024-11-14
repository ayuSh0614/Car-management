// backend/controllers/carController.js
const Car = require('../models/Car');

// Controller to create a new car
exports.createCar = async (req, res) => {
    try {
        const imagePaths = req.files.map(file => file.filename);
        const car = await Car.create({
            ...req.body,
            images: imagePaths,
            user: req.user.id
        });
        res.status(201).json(car);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller to get all cars for the logged-in user
exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find({ user: req.user.id });
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get a specific car by ID
exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to update a car by ID
exports.updateCar = async (req, res) => {
    try {
        const newImagePaths = req.files.map(file => file.filename);
        const car = await Car.findByIdAndUpdate(
            req.params.id,
            { ...req.body, images: newImagePaths },
            { new: true }
        );
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to delete a car by ID
exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
