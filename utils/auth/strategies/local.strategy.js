const { Strategy } = require('passport-local');
const { AuthService } = require('../../../services/auth.service');
const service = new AuthService();


//Definimos la logica de negocio.
/**
 * Strategy cuenta con una funcion asincrona.
 * 1- Buscamos el usuario por su email
 * 2- Si no lo encuentra, boom!
 * 2- Si lo encuentra, que compare la contraseña con el hash guardado en la db
 * 3- Si no lo encuentra bomm!
 * 4- Si isMatch es ok, le devuelve a traves del done el usuario.
 */
const LocalStrategy = new Strategy({
  /**
   * Puedo cambiar las configuraciones
   * a la estrategia local
   */
  usernameField: 'email',
  passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = { LocalStrategy };
