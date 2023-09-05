const express = require('express');
const passport = require('passport');
const router = express.Router();
const { AuthService } = require('../services/auth.service');
const service = new AuthService();

router.post('/login',
  /**
   * ESTA RUTA ES PARA HACER LA FIRMA DEL TOKEN
   * Le envio la palabra clave por la cual me quiero
   * autenticar. La strategy es local y que no quiero manejar
   * sesiones.
   * Este passportauthenticate envia los datos al
   * servicio que cree en local.strategy
   */
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.singToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta =  await service.sendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/change-password',
//agregar capa de validacion de datos
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta =  await service.changePassword({ token, newPassword });
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);



module.exports = router;

