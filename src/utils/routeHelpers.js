const passport = require('passport');

const noSession = { session: false };
const TokenRequired = passport.authenticate('jwt', noSession);
const LocalLoginRequired = passport.authenticate('local', noSession);

module.exports = {
    TokenRequired,
    LocalLoginRequired
};