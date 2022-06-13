const passport = require('passport');
const Joi = require('joi');

module.exports = {
  isAuthenticated: (req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
      if (err || !user) {
        res.status(403).send({
          error: 'You Shall not Pass'
        });
      } else {
        req.user = user;
        next();
      }
    })(req, res, next);
  },
  signup: (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string().email(),
      // must contain at least 1 letter
      // must contain at least 1 numeric
      password: Joi.string().alphanum(),
      surname: Joi.string(),
      firstName: Joi.string(),
      birthdate: Joi.date()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      switch (error.details[0].context.key) {
        case 'username':
          res.status(400).send({
            error: 'this is not an email and you need to have a proper email to register'
          });
          break;
        case 'password':
           // TODO: update Error message
          res.status(400).send({
            error: `password does not match the combination.
              must contain at least 1 letter.
              must contain at least 1 number.
            `
          });
          break;
        default:
          console.log(error.details[0])
          res.status(400).send({
            error: 'invalid registration info'
          });
          break;
      }
    } else {
      next();
    }
  }
};
