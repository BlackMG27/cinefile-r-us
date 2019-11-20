const router = require("express").Router();

router.get('/api/movie/:id', (req, res) => {
    res.json(req.body);
})

module.exports = router;