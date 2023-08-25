const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/login',
  /**
   * Le envio la palabra clave por la cual me quiero
   * autenticar. La strategy es local y que no quiero manejar
   * sesiones.
   * Este passportauthenticate envia los datos al
   * servicio que cree en local.strategy
   */
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      /**
       * Si todo fue bien,
       * me devuelve el user en
       * req.user
       */
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

