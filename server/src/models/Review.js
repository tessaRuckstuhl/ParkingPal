const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    reviewer: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: {
            unique: true
        }
    },
    rating: {
        type: BigInt,
        required: true
    },
    description: {
        type: String,
        trim: true,
    },
    neighborhoodRating: {
        type: BigInt,
    },
    communicationRating: {
        type: BigInt,
    },
    accessRating: {
        type: BigInt,
    },
    accuracyRating: {
        type: BigInt,
    },
    locationRating: {
        type: BigInt,
    },
    valueRating: {
        type: BigInt,
    }
}, {
    timestamps: true
});


const User = mongoose.model('Review', ReviewSchema);

module.exports = Review;
