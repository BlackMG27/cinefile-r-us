//set up the variables
const router = require('express').Router();
const reviewRoutes = require('./review');
const commentRoutes = require('./comment');
const userRoutes = require('./users');
//grab the review and comment routes
router.use('/review', reviewRoutes);
router.use('/comment', commentRoutes);
router.use('/users', userRoutes);

//export the router
module.exports = router;