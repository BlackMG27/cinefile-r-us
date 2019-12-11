const db = require('../models');

module.exports = {
    findReviews: (req, res) => {
        const id = req.params.id
        db
            .Review
            .findAll({
                where: {
                    imdbId: id,
                    activeReview: true
                }
            })
            .then(reviews => res.json(reviews))
            .catch(err => console.log(err))
    },

    findUserReviews: (req, res) => {
        const id = req.params.id;
        db
            .Review
            .findAll({
                where: {
                    UserUserId: id,
                    activeReview: true
                }
            })
            .then(reviews => res.json(reviews))
            .catch(err => res.status(422).json(err))
    },

    createReviews: (req, res) => {
        db
            .Review
            .create({
                username: req.body.reviewer,
                reviewTitle: req.body.reviewTitle,
                rating: req.body.rating,
                reviewText: req.body.reviewText,
                imdbId: req.body.imdbId,
                movieTitle: req.body.movieTitle,
                UserUserId: req.body.UserId
            })
            .then(review => res.json(review))
            .catch(err => console.log(err))
    },

    editReviews: (req, res) => {
        const id = req.params.id;

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
        const id = req.body.id;
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