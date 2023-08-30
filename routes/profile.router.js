const express = require('express');
const passport = require('passport');
const router = express.Router();
const OrderService = require('../services/order.service');
const service = new OrderService();

router.get('/my-orders',
  /**
   * Le envio la palabra clave por la cual me quiero
   * autenticar. La strategy es local y que no quiero manejar
   * sesiones.
   * Este passportauthenticate envia los datos al
   * servicio que cree en local.strategy
   */
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

