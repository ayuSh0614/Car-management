// backend/routes/carRoutes.js
const express = require('express');
const { createCar, getCars, getCarById, updateCar, deleteCar } = require('../controllers/carController'); // Ensure these functions are correctly imported
const auth = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Routes
router.post('/', auth, upload.array('images', 10), createCar); // POST route for creating a car
router.get('/', auth, getCars); // GET route for fetching all cars
router.get('/:id', auth, getCarById); // GET route for fetching a car by ID
router.put('/:id', auth, upload.array('images', 10), updateCar); // PUT route for updating a car
router.delete('/:id', auth, deleteCar); // DELETE route for deleting a car

module.exports = router;
