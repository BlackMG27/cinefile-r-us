const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateSignUpInput(data) {
    let errors = {};
    //convert data into empty strings so that we can use validator functions
    data.name = !isEmpty(data.name) ?
        data.name :
        "";
    data.username = !isEmpty(data.username) ?
        data.username :
        "";
    data.email = !isEmpty(data.email) ?
        data.email :
        "";
    data.password = !isEmpty(data.password) ?
        data.password :
        "";
    data.password2 = !isEmpty(data.password2) ?
        data.password2 :
        "";
    //checks to see if name and username is good
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required!";
    }
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required!";
    }
    //checks to see if email checks out
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required!";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid!";
    }
    //checks the passwords
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required!";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm Password is required!";
    }
    if (!Validator.isLength(data.password, {
            min: 8,
            max: 30
        })) {
        errors.password = "Password must be at least 8 characters in length!"
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match!"
    }
    return { errors, isValid: isEmpty(errors) }
}