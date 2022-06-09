const jwt = require('jsonwebtoken');
const { Review } = require('../models');


module.exports = {
    findByID: (req, res) => {
        const { review } = req;
        if (!review) {
            return res.status(400).send({ error: 'server is having an issue please try again later' });
        }
        return res.json(review);
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
    async deleteReview(req, res) {
        try {
            const { reviewer } = req.body;

            const review = await Review.findOne({ reviewer });

            if (!review) {
                return res.status(404).send({ error: 'review does not exist' });
            }
            await Review.deleteOne({ reviewer }) // TODO need to be delete by id, not by reviewer


            const reviewObjJson = review.toJSON();
            return res.send({
                review: reviewObjJson
            });
        } catch (error) {
            return res.status(500).send({ error });// 'we have an error we don\'t know what to do' })
        }
    },
    async readReview(req, res) {
        try {
            const { id } = req.body; // I need more attributes here. 
            const review = await Review.findOne({ id });
            if (!review) {
                return res.status(404).send({ error: 'review does not exist' });
            }
            const reviewObjJson = review.toJSON();
            return res.send({
                review: reviewObjJson
            });
        } catch (error) {
            return res.status(500).send({ error });// 'we have an error we don\'t know what to do' })
        }
    }
};


// UPDATE fehlt noch!


