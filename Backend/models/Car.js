// backend/models/Car.js
const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    images: [{ type: String }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Car', CarSchema);
