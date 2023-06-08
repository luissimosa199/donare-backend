// import multer from "multer";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const PRIVATE_KEY = 'blablablabla';
const generateJWToken = (user) => {
  return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '60s' });
};
const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ error: 'not authenticated' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.status(403).send({ error: 'not authorized' });
    req.user = credentials.user;
    next();
  });
};
const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);
const passportCall = (strategy) => {
  return async (req, res, next) => {
    console.log('Entrando a llamar strategy: ');
    console.log(strategy);
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res
          .status(401)
          .send({ error: info.messages ? info.messages : info.toString() });
      }
      console.log('Usuario obtenido del strategy: ');
      console.log(user);
      req.user = user;
      next();
    })(req, res, next);
  };
};
const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).send({ error: 'unauthorized' });
    if (req.user.role != role)
      return res.status(403).send({ error: 'no permissions' });
    next();
  };
};
module.exports = {
  authorization,
  passportCall,
  isValidPassword,
  authToken,
  createHash,
  generateJWToken,
  PRIVATE_KEY,
};
