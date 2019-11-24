const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');

//use the routes from api folder
router.use('/api', apiRoutes);

//if no api is called, then send user to react app
router.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

//export the routes
module.exports = router;