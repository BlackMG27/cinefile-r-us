const db = require('../models');

module.exports = {
    findReviews: (req, res) => {
        const id = req.params.imdbId
        db
            .Review
            .findAll({
                where: {
                    imdbId: id
                }
            })
            .then(reviews => res.json(reviews))
            .catch(err => res.status(422).json(err))
    },

    findUserReviews: (req, res) => {
        const id = req.params.userId;
        db
            .Review
            .findAll({
                where: {
                    UserUserId: id
                }
            })
            .then(reviews => res.json(reviews))
            .catch(err => res.status(422).json(err))
    },

    createReviews: (req, res) => {
        db
            .Review
            .create({
                reviewer: req.body.data.reviewer,
                reviewTitle: req.body.data.reviewTitle,
                rating: req.body.data.rating,
                reviewText: req.body.data.reviewText,
                imdbId: req.body.data.imdbId,
                movieTitle: req.body.data.movieTitle
            })
            .then(review => res.json(review))
            .catch(err => res.status(422).json(err))
    },

    editReviews: (req, res) => {
        const id = req.params.reviewId;

        db
            .Review
            .update({
                reviewTitle: req.body.data.reviewTitle,
                rating: req.body.data.rating,
                reviewText: req.body.data.reviewText
            }, {
                where: {
                    reviewId: id
                }
            })
            .then(update => res.json(update))
            .catch(err => res.status(422).json(err))
    },
    archiveReviews: (req, res) => {
        //grab the id
        const id = req.body.reviewId;
        //create an object to make activeReview false
        const reviewObj = {
                activeReview: false
            }
            //update the review table
        db
            .Review
            .update({
                reviewObj,
                where: {
                    reviewId: id
                }
            })
            .then(review => res.json(review))
            .catch(err => res.status(422).json(err))
    }
}