const jwt = require('jsonwebtoken');
const { ParkingSpaceReview } = require('../models');


module.exports = {
    async findByID(req, res) {
        const { id } = req.params;
        const review = await ParkingSpaceReview.findById(id);
        if (!review) {
            return res.status(400).send({ error: 'server is having an issue please try again later' });
        }
        return res.json(review);
    }, 
    async getReviewList(req, res) {
        try {
            const allReviews = await ParkingSpaceReview.find();
            return res.send(allReviews);
        } catch (error) {
            return res.status(400).send({ error: 'There was an error trying to get all parkingSpace Reviews' });
        }
    },
    async updateById(req, res) {
        const { id } = req.params;
        const update = req.body;
        try {
            const updatedReview = await ParkingSpaceReview.findOneAndUpdate({ _id: id }, { ...update }, { new: true })
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
            const review = await ParkingSpaceReview.create(req.body);
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
            await ParkingSpaceReview.deleteOne({ _id: id })
            return res.status(200).send({ success: 'Review was deleted' })
        } catch (error) {
            return res.status(400).send({ error: 'something is wrong' });
        }
    },
};



