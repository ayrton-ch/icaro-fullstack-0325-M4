const {
  isRequired,
  isString,
  isEmail,
  minLength,
  maxLength,
  isNumber,
} = require("./validator.js");

let registerValidator = function (req, res, next) {
  try {
    // Validar que los campos esten completo
    isRequired(req.body, "name");
    isRequired(req.body, "email");
    isRequired(req.body, "password");
    isRequired(req.body, "phone_number");
    isRequired(req.body, "specialization");
    isRequired(req.body, "gym_name");
    isRequired(req.body, "session_price");
    isRequired(req.body, "certifications");

    // Validar tipos y formatos
    isEmail(req.body.email);
    isString(req.body, "name");
    isString(req.body, "email");
    isString(req.body, "password");
    minLength(req.body.password, 6);
    maxLength(req.body.password, 12);
    isString(req.body, "phone_number");
    isString(req.body, "specialization");
    isString(req.body, "gym_name");
    isNumber(req.body, "session_price");
    isString(req.body, "certifications");
  } catch (e) {
    return res.status(422).json({ message: e });
  }

  return next();
};

let loginValidator = function (req, res, next) {
  try {
    // Validar que los campos esten completo
    isRequired(req.body, "email");
    isRequired(req.body, "password");

    // Validar tipos y formatos
    isEmail(req.body.email);
    isString(req.body, "email");
    isString(req.body, "password");
    minLength(req.body.password, 6);
    maxLength(req.body.password, 12);
  } catch (e) {
    return res.status(422).json({ message: e });
  }

  return next();
};

module.exports = {
  loginValidator,
  registerValidator,
};
