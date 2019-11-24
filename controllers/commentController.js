const db = require('../models');

module.exports = {
    findReviewComments: (req, res) => {
        const id = req.params.ReviewReviewId;
        db
            .Comment
            .findAll({
                where: {
                    reviewId: id
                }
            })
            .then(comment => res.json(comment))
            .catch(err => res.status(422).json(err))
    },
    findUserComments: (req, res) => {
        const id = req.params.UserUserId;
        db
            .Comment
            .findAll({
                where: {
                    userId: id
                }
            })
            .then(comment => res.json(comment))
            .catch(err => res.status(422).json(err))
    },
    createComment: (req, res) => {
        db
            .Comment
            .create({ username: req.body.data.username, commentText: req.body.data.commentText })
            .then(comment => res.json(comment))
            .catch(err => res.status(422).json(err))
    },
    archiveComment: (req, res) => {
        const id = req.params.commentId;
        const commentObj = {
            activeComment: false
        }
        db
            .Comment
            .update({
                commentObj,
                where: {
                    commentId: id
                }
            })
            .then(comment => res.json(comment))
            .catch(err => res.status(422).json(err))
    }
}