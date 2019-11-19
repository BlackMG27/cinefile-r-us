const router = require("express").Router();

router.get('/movie', (req, res) => {
    res.json(req.body);
})

module.exports = router;