const router = require("express").Router();
const reviewController = require('../../controllers/reviewController');

//create review
router
    .route('/')
    .post(reviewController.createReviews);

//find user reviews
router
    .route('/profile/:id')
    .get(reviewController.findUserReviews);

//find reviews by movie id
router
    .route('/movie/:id')
    .get(reviewController.findReviews);

//edit reviews
router
    .route('/edit')
    .put(reviewController.editReviews);

//archive reviews
router
    .route('/archive/:id')
    .put(reviewController.archiveReviews);

module.exports = router;