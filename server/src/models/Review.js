const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    booking_id:{
        required: true,
        type: String
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        trim: true,
    },
    neighborhoodRating: {
        type: Number,
    },
    communicationRating: {
        type: Number,
    },
    accessRating: {
        type: Number,
    },
    accuracyRating: {
        type: Number,
    },
    locationRating: {
        type: Number,
    },
    valueRating: {
        type: Number,
    }
}, {
    timestamps: true
});


const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
