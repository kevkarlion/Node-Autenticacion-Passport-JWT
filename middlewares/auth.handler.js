const boom = require('@hapi/boom');
const {config } = require('../config/config');


//Leo los datos que recibo desde la req.headers.
//Compruebo que coincida con la variable de entorno que
//configure, con su key correspondiente.
function checkApiKey (req, res, next) {
  const apiKey = req.headers['api'];
  if( apiKey === config.apiKey ){
    next();
  } else {
    next(boom.unauthorized());
  };
};

function checkAdminRole(req, res, next){
  console.log(req.user);
  const user = req.user;
  if(user.role === 'admin'){
    next();
  }else {
    next(boom.unauthorized());
  };
};

function checkRoles(...roles){
  return (req, res, next) =>{
    const user = req.user;

    //chequeo que este incluido
    //el role en los parametros
    //que tengo en el usuario,
    //desde su payload.
    //si esta, es xq tiene permisos
    if(roles.includes(user.role)){
      next();
    }else {
      next(boom.unauthorized());
    };
  }

};


module.exports = { checkApiKey, checkAdminRole, checkRoles };


/**
 * Tanto la notación de punto (objeto.propiedad) como la notación de corchetes (objeto['propiedad']) se utilizan para acceder a las propiedades de un objeto en JavaScript, pero tienen algunas diferencias en su uso:

Notación de Punto:
Es más concisa y fácil de leer.
Funciona bien cuando el nombre de la propiedad es una palabra simple y no contiene caracteres especiales ni espacios.
No se puede utilizar cuando el nombre de la propiedad tiene espacios o caracteres especiales.
No se puede calcular el nombre de la propiedad dinámicamente, ya que el nombre de la propiedad debe ser conocido en tiempo de escritura.
javascript
Copy code
const valor = objeto.propiedad;
Notación de Corchetes:
Permite acceder a propiedades con nombres que contienen espacios, caracteres especiales y aquellas cuyos nombres son el resultado de una expresión.
Es útil cuando necesitas construir propiedades de manera dinámica, ya que puedes pasar una cadena en lugar de un nombre de propiedad estático.
Aunque puede ser un poco menos legible, es más versátil en términos de los nombres de propiedades a los que puedes acceder.
javascript
Copy code
const valor = objeto['propiedad'];
const nombreDePropiedad = 'propiedad';
const valorDinamico = objeto[nombreDePropiedad];
En el contexto del encabezado de solicitud (req.headers), dado que los nombres de los encabezados suelen ser cadenas simples sin espacios ni caracteres especiales, ambas notaciones son intercambiables. Puedes usar la que te resulte más clara y legible. Por ejemplo, req.headers.api y req.headers['api'] son equivalentes en este caso particular.
 */
