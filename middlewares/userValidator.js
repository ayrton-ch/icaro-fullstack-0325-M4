const {
    isString, isEmail, minLength, maxLength, emailNotExists
} = require('./validator.js')

let userValidator = function (req, res, next) {
    try {
        isString(req.body, 'email');
        isEmail(req.body.email);
        emailNotExists(req.body.email);
        isString(req.body, 'password');
        minLength(req.body.password, 8);
        maxLength(req.body.password, 12);
    } catch (e) {
        return res.status(422).json({message : e})
    }

    return next();
}

module.exports = userValidator