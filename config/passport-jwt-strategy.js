const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../model/user');
const env = require('./env')

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}

passport.use(new JWTstrategy(opts, async function (jwtPayLoad, done) {

    try {
        let user = await User.findById(jwtPayLoad._id)

        if (user) {
            return done(null, user);
        } else {
            return done(null, false)
        }

    } catch (error) {
        console.log('jwt Error', error)
    }


}))

module.exports = passport;