// validar que sea un string
function isString(obj, prop) {
    if (typeof obj[prop] !== 'string') {
        throw `El atributo ${prop} debe ser un string.`;
    }
}

// validar que el email tenga una arroba
function isEmail(str) {
    if (!str.includes('@')) {
        throw 'El email no tiene un formato valido.';
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

function emailNotExists(str) {
    if (false) {
        throw `El email ya ha sido registrado.`
    }
}

module.exports = {
    isString,
    isEmail,
    minLength,
    maxLength,
    emailNotExists,
}