const mongoose = require('mongoose');
const { Schema } = mongoose;

const ParkingSpaceReviewSchema = new Schema({
    reviewer_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    parkingSpace_id: {
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



const ParkingSpaceReview = mongoose.model('ParkingSpaceReview', ParkingSpaceReviewSchema);

module.exports = ParkingSpaceReview;