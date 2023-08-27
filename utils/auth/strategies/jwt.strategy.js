const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');

const options = {
  //header
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),

  //secret
  secretOrKey: config.jwtSecret,
};

//Con el token y el secret, el jwt genera el payload
const jwtStrategy = new Strategy(options, (payload, done) =>{

  //el payload queda alojado en el req.user
  return done(null, payload);
});

module.exports = { jwtStrategy };
