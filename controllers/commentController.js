const db = require('../models');

module.exports = {
    findReviewComments: (req, res) => {
        const id = req.params.id;
        db
            .Comment
            .findAll({
                where: {
                    reviewId: id,
                    activeComment: true
                }
            })
            .then(comment => res.json(comment))
            .catch(err => res.status(422).json(err))
    },
    findUserComments: (req, res) => {
        const id = req.params.id;
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
            .create({ username: req.body.username, commentText: req.body.commentText })
            .then(comment => res.json(comment))
            .catch(err => res.status(422).json(err))
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