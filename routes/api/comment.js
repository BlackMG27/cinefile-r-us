const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/commentController');

//create comment
router
    .route('/')
    .post(commentController.createComment);

//find comment by reviewId
router
    .route('/review/:id')
    .get(commentController.findReviewComments);

//find comment by user
router
    .route('/profile/:id')
    .get(commentController.findUserComments);

//archive comment
router
    .route('/archive/:id')
    .post(commentController.archiveComment);

module.exports = router;