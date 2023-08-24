/**
 * Aca definimos las estrategias que vamos a usar
 */
const passport = require('passport');
const { LocalStrategy } = require('../auth/strategies/loca.strategy');

//const { LocalStrategy } = require('../auth/strategies/facebook.strategy');
//const { LocalStrategy } = require('../auth/strategies/twitter.strategy');



passport.use(LocalStrategy);


