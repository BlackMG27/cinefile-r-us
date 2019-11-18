const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInputs(data) {
    let errors = {};
    //convert empty data fields to empty strings so we can use validator functions
    data.email = !isEmpty(data.email) ?
        data.email :
        "";
    data.password = !isEmpty(data.password) ?
        data.password :
        "";
    //Checks email
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required!";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid!";
    }
    //Checks password
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password Field is required";
    }

    return { errors, isValid: isEmpty(errors) }
}