//set up the variables
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
//grab the login/signup validation
const validateLoginInput = require("../../validation/login");
const validateSignupInput = require("../../validation/signup");
//grab the user model
const db = require("../../models");
const dbUser = db.User;

//@route POST api/users/signup // @desc Register, user @access Public
router.post("/signup", (req, res) => {
    //Form validation
    const { errors, isValid } = validateSignupInput(req.body);
    //check validation
    if (!isValid) {
        return res
            .status(400)
            .json(errors);
    }
    dbUser
        .findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (user) {
                return res
                    .status(400)
                    .json({ email: "Email already exists. Try Again" })
            } else {
                const newUser = new dbUser({ name: req.body.name, username: req.body.username, email: req.body.email, password: req.body.password })
                    //set bcrypt variables ready hash password before saving into database
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt
                        .hash(newUser.password, salt, function(err, hash) {
                            if (err)
                                throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err));
                        })
                })
            }

        })

});

// @route POST api/users/login, @desc Login user and return JWT token @access
// Public
router.post('/login', (req, res) => {
    //Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    //check to see if valid
    if (!isValid) {
        //return error message
        return res
            .status(400)
            .json(errors);
    }
    //separate the email and password
    const email = req.body.email;
    const password = req.body.password;
    //find user by email
    dbUser
        .findOne({
            where: {
                email: email
            }
        })
        .then(user => {
            //check if user exists
            if (!user) {
                //return email not found
                return res
                    .status(404)
                    .json({ emailNotFound: "Email Not Found" })
            }
            //check password
            bcrypt
                .compare(password, user.password, function(err, match) {
                    console.log(password);
                    if (err)
                        throw err;
                    if (match == true) {
                        //create the payload
                        const payload = {
                                id: user.userId,
                                name: user.username
                            }
                            //Sign Token
                        console.log(payload);
                        jwt.sign(payload, keys.secretOrKey, {
                            expiresIn: 31556926 // 1 year in seconds
                        }, (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer" + token
                            })
                        })
                    } else {
                        return res
                            .status(400)
                            .json({ passwordIncorrect: "Incorrect password" })
                    }
                })

        })

})

module.exports = router;