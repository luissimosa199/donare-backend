const passport = require('passport');
const jwtStrategy = require('passport-jwt');
const userModel = require('../services/db/models/user.model.js');
const { PRIVATE_KEY } = require('./utility/utils.js');

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {
  const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['jwtCookieToken'];
    }
    return token;
  };
  passport.use(
    'jwt',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (e) {
          return done(e);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      console.error('Error deserializando el usuario: ' + error);
    }
  });
};
module.exports = initializePassport;
