const mongoose = require('mongoose');
const { Schema } = mongoose;

const ParkingSpaceReviewSchema = new Schema({
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    parkingSpace: {
        type: Schema.Types.ObjectId,
        ref: 'ParkingSpace',
        //required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
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


const UserReviewSchema = new Schema({
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reviewed: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    }
}, {
    timestamps: true
});


const UserReview = mongoose.model('UserReview', UserReviewSchema);
const ParkingSpaceReview = mongoose.model('ParkingSpaceReview', ParkingSpaceReviewSchema);

module.exports = UserReview;
module.exports = ParkingSpaceReview;