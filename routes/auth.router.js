const express = require('express');
const passport = require('passport');
const router = express.Router();


router.post('/login',
  /**
   * Le envio la palabra clave por la cual me quiero
   * autenticar. La strategy es local y que no quiero manejar
   * sesiones.
   */
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;

