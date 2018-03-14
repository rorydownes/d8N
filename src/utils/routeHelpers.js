const passport = require('passport');

const JWTRequired = passport.authenticate('jwt', { session: false });

module.exports = {
    JWTRequired,
};