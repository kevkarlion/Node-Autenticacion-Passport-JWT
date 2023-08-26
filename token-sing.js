const jwt = require('jsonwebtoken');
/**
 * Partes de token
 * 1- header
 * 2- payload
 * 3- firma
 */

/**
 * Secret: Es como va a encriptar el header y el payload
 * Solo el backend debe saberlo.
 * Debe ser una variable de ambiente.
 * Nunca debe estar en el codigo, aca es a modo de ejemplo
 */

const secret = "myCat";

//Payload es lo que vamos a encriptar dentro del token
const payload = {
  //SUB - Forma en la que vamos a identificar al usuario.
  sub: 1,
  role: 'customer'
};

function signToken(payload, secret){
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);

console.log(token);
