const jwt = require('jsonwebtoken');
const { User } = require('../models');

function jwtSignUser(user) {
    const ONE_WEEK = 7 * 24 * 60 * 60;
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: ONE_WEEK
    });
}

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
            return res.status(400).send({ error: 'something is wrong' });
        }
    },
    async deleteReview(req, res) {
        try {
            const { review } = req;
            if (!review) {
                return res.status(404).send({ error: 'review does not exist' });
            }

            await Review.delete(review)             // TODO Geht das so?
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

// Fragen: 
/*
1. Wie muss ich mich um den JWT Token kümmern? 
2. Was macht der zweite Parameter bei dem Routing?
3. Brauche ich Methoden bei meinem Model?  


*/
