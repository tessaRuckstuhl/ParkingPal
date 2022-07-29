const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const { Review } = require('../models');
const validator = require('validator')


module.exports = {
    async findByID(req, res) {
        const { id } = req.params;
        const review = await Review.findById(id);
        if (!review) {
            return res.status(400).send({ error: 'server is having an issue please try again later' });
        }
        return res.json(review);
    },
    async getReviewList(req, res) {
        try {
            const allReviews = await Review.find();
            return res.send(allReviews);
        } catch (error) {
            return res.status(400).send({ error: 'There was an error trying to get all Reviews' });
        }
    },
    async listOwnedReviews(req, res) {
        const { id } = req.params;
        if (id) {
            const allReviews = await Review.find({
                reviewer: mongoose.Types.ObjectId(id),
            }).sort({ _id: -1 });
            return res.send(allReviews);
        } else {
            return res
                .status(400)
                .send({ error: 'There was an error trying to get owner parking spaces' });
        }
    },
    async updateReview(req, res) {
        console.log("oke")
        const { id } = req.params;
        const update = req.body;
        try {
            const updatedReview = await Review.findOneAndUpdate({ _id: id }, { ...update }, { new: true })
            const reviewObjJson = updatedReview.toJSON();
            return res.send({
                review: reviewObjJson,
            });
        } catch (error) {
            return res.status(400).send({ error: 'something is wrong' });
        }
    },
    async createReview(req, res) {
        try {
            // request validation
            let { description, reviewer, overallRating, neighborhoodRating, accessRating, locationRating, communicationRating, accuracyRating, valueRating, booking, parkingSpace } = req.body

            if (
                !validator.isFloat(overallRating.toString()) ||
                !validator.isFloat(neighborhoodRating.toString()) ||
                !validator.isFloat(accessRating.toString()) ||
                !validator.isFloat(locationRating.toString()) ||
                !validator.isFloat(communicationRating.toString()) ||
                !validator.isFloat(accuracyRating.toString()) ||
                !validator.isFloat(valueRating.toString()) ||
                !validator.isMongoId(reviewer._id) ||
                !validator.isMongoId(parkingSpace._id) ||
                !typeof description == 'string' ||
                !validator.isMongoId(booking._id))
                return res.status(406).send({ error: 'input is wrong' });


            const review = await Review.create(req.body);
            const reviewObjJson = review.toJSON();
            return res.send({
                review: reviewObjJson
            });
        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: 'something is wrong' });
        }
    },
    async deleteById(req, res) {
        const { id } = req.params
        try {
            await Review.deleteOne({ _id: id })
            return res.status(200).send({ success: 'Review was deleted' })
        } catch (error) {
            return res.status(400).send({ error: 'something is wrong' });
        }
    },
    async getReviewsForParkingSpace(req, res) {
        const { id } = req.params
        try {

            const reviews = await Review.find({ parkingSpace: mongoose.Types.ObjectId(id) });

            return res.send({
                reviews: reviews
            });
        } catch (error) {
            return res.status(400).send({ error: 'something is wrong' });
        }
    },
    async getReviewStats(req, res) {
        const { id } = req.params
        try {
            // get all reviews with correct parkingSpace Id
            const reviews = await Review.find({ parkingSpace: mongoose.Types.ObjectId(id) });

            if (reviews.length == 0) {
                return res.send({
                    averageRating: "",
                    amount: reviews.length
                });
            }
            let sumOverallRating = 0
            let sumNeighborhoodRating = 0
            let sumAccessRating = 0
            let sumLocationRating = 0
            let sumCommunicationRating = 0
            let sumAccuracyRating = 0
            let sumValueRating = 0

            reviews.map(review => {
                sumOverallRating += review.overallRating
                sumNeighborhoodRating += review.neighborhoodRating
                sumAccessRating += review.accessRating
                sumLocationRating += review.locationRating
                sumCommunicationRating += review.communicationRating
                sumAccuracyRating += review.accuracyRating
                sumValueRating += review.valueRating
            })
            return res.send({
                averageOverallRating: (sumOverallRating / reviews.length).toFixed(2),
                averageNeighborhoodRating: (sumNeighborhoodRating / reviews.length).toFixed(2),
                averageAccessRating: (sumAccessRating / reviews.length).toFixed(2),
                averageLocationRating: (sumLocationRating / reviews.length).toFixed(2),
                averageCommunicationRating: (sumCommunicationRating / reviews.length).toFixed(2),
                averageAccuracyRating: (sumAccuracyRating / reviews.length).toFixed(2),
                averageValueRating: (sumValueRating / reviews.length).toFixed(2),
                amount: reviews.length
            });

        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: 'something is wrong' });

        }

    }
};



