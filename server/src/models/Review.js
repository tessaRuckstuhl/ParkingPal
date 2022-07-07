const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({

    parkingSpace: {
        type: Schema.Types.ObjectId,
        ref: 'ParkingSpace',
        required: true,
    },
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    booking: {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
    },
    description: {
        type: String,
    },
    overallRating: {
        type: Number,
        required: true,
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