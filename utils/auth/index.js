/**
 * Aca definimos las estrategias que vamos a usar
 */
const passport = require('passport');
const { LocalStrategy } = require('./strategies/local.strategy');
const { jwtStrategy } = require('./strategies/jwt.strategy');

//const { LocalStrategy } = require('../auth/strategies/facebook.strategy');
//const { LocalStrategy } = require('../auth/strategies/twitter.strategy');

passport.use(LocalStrategy);
passport.use(jwtStrategy);



