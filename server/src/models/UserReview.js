const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserReviewSchema = new Schema({
    reviewer_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reviewed_id: { 
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

module.exports = UserReview;