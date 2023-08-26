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

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY5MzAxMTg1Nn0.05o-JePG9Kve6ap_bybxc_Mju7MFkvRVELIP_KoiVuo'
const secret = "myCat";



function verifyToken(token, secret){
  return jwt.verify(token, secret);
}


//En el payload no deberia guardar info sensible.
//Mail, password, etc.
const payload = verifyToken(token, secret);

console.log(payload);
