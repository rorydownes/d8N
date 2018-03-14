const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const UserModel = require('../models/UserModel');

const { JWT_ISSUER, JWT_SECRET } = process.env;

module.exports = function() {
    // Register JWT Strategy (Token)
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('auth-token'),
        secretOrKey: JWT_SECRET,
        issuer: JWT_ISSUER
    }, async (payload, done) => {
        try {
            const foundUser = await UserModel.findById(payload.sub);
            return (foundUser) 
                ? done(null, foundUser) 
                : done(null, false);
        } catch(error) {
            done(error, false);
        }
    }));

    // Register Local Strategy (Email/Password)
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const foundUser = await UserModel.findOne({ email });
            
            if (!foundUser) {
                return done(null, false);
            }

            const passwordMatchesDB = await foundUser.matchesSavedPassword(password);
            if (!passwordMatchesDB) {
                return done(null, false);
            }

            return done(null, foundUser);
        } catch(error) {

        }
        const foundUser = await UserModel.findById(payload.sub);


    }));
};