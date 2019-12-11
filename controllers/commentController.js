const db = require('../models');

module.exports = {
    findReviewComments: (req, res) => {
        const id = req.params.id;
        db
            .Comment
            .findAll({
                where: {
                    ReviewReviewId: id,
                    activeComment: true
                }
            })
            .then(comment => res.json(comment))
            .catch(err => console.log(err))
    },
    findUserComments: (req, res) => {
        const id = req.params.id;
        db
            .Comment
            .findAll({
                where: {
                    UserUserId: id,
                    activeComment: true
                }
            })
            .then(comment => res.json(comment))
            .catch(err => res.status(422).json(err))
    },
    createComment: (req, res) => {
        db
            .Comment
            .create({ username: req.body.username, commentText: req.body.commentText, ReviewReviewId: req.body.reviewId, UserUserId: req.body.userId })
            .then(comment => res.json(comment))
            .catch(err => console.log(err))
    },
    archiveComment: (req, res) => {
        const id = req.params.id;
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