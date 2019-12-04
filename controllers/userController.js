const db = require('../models');

module.exports = {
    getUserProfile: (req, res) => {
        const id = req.params.id;
        db
            .User
            .findOne({
                where: {
                    userId: id
                }
            })
            .then(profile => res.json(profile))
            .catch(err => console.log(err))
    }
}