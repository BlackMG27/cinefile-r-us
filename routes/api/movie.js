const router = require("express").Router();

router.post("/", (req, res) => {
    console.log("yoyoyo", req.body);
    res.json(req.body);
})

module.exports = router;