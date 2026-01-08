// validar que sea un string
function isString(obj, prop) {
  if (typeof obj[prop] !== "string") {
    throw `El atributo ${prop} debe ser un string.`;
  }
}

// validar que el email tenga una arroba
function isEmail(str) {
  if (!str.includes("@")) {
    throw "El email no tiene un formato valido.";
  }
}

// validar que el password tenga entre 8 y 12 caracteres
function minLength(str, min) {
  if (str.length < min) {
    throw `El password requiere al menos ${min} caracteres`;
  }
}

function maxLength(str, max) {
  if (str.length > max) {
    throw `El password requiere como máximo ${max} caracteres`;
  }
}

// validar que el campo exista y no esté vacío
function isRequired(obj, prop) {
  if (!obj[prop] || obj[prop].trim() === "") {
    throw `El campo ${prop} es obligatorio y no puede estar vacío.`;
  }
}

function isNumber(obj, prop) {
  if (isNaN(obj[prop]) || obj[prop] === "") {
    throw `El campo ${prop} debe ser un número válido.`;
  }
}

module.exports = {
  isRequired,
  isString,
  isEmail,
  minLength,
  maxLength,
  isNumber,
};
