const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const { Review } = require('../models');

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
    async updateById(req, res) {
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
            const review = await Review.create(req.body);
            const reviewObjJson = review.toJSON();
            return res.send({
                review: reviewObjJson
            });
        } catch (error) {
            // TODO Error, for duplicate key error
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
            let sum = 0
            reviews.map(review => {
                sum += review.overallRating
            })

            sum /= reviews.length
            return res.send({
                averageRating: sum,
                amount: reviews.length
            });

        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: 'something is wrong' });

        }

    }
};



