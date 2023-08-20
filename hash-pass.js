const bcrypt = require('bcrypt');

//bycrypt es asincrono

async function hasPass(){
  const myPassword = 'admin 123 2002';
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hasPass();

/**
 * Las primeras 4 son el tipo de encriptacion, y luego cuantas veces
 * lo encripte, o sea 10. Lo demas si es el hash.
 * // $2b$10$54Uh6KToAJVOVvMAQdJKe.iX9tKyd4byQX7tEeQ4lGIJAxfVTu1MO
 */


