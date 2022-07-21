const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    reviewText: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    firstName: {
        type: String,
        required: true,
        trim: true 
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    }
});

const Review = model('Review', reviewSchema);

module.exports = Review;