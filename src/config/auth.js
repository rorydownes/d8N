const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const UserModel = require('../models/UserModel');

const { JWT_ISSUER, JWT_SECRET } = process.env;

module.exports = function() {
    console.log('Register JWT Strategy');
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('jwt-token'),
        secretOrKey: JWT_SECRET,
        issuer: JWT_ISSUER
    }, async (payload, done) => {
        console.log({ payload });
        try {
            const foundUser = await UserModel.findById(payload.sub);
            return (foundUser) 
                ? done(null, foundUser) 
                : done(null, false);
        } catch(error) {
            done(error, false);
        }
    }));
};