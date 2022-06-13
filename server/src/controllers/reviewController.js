const jwt = require('jsonwebtoken');
const { Review } = require('../models');


module.exports = {
    findByID: (req, res) => {
        const { id } = req.params;
        const review = await Review.findById(id);
        if (!review) {
            return res.status(400).send({ error: 'server is having an issue please try again later' });
        }
        return res.json(review);
    }, getReviewList: (req, res) => { // TODO LOGIK
        const { review } = req.params;
        if (!review) {
            return res.status(400).send({ error: 'server is having an issue please try again later' });
        }
        return res.json(review);
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
            console.log(1)
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
    async createReview(req, res) {
        try {
            console.log(1)
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
};



