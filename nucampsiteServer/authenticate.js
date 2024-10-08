const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const FacebookTokenStrategy = require('passport-facebook-token');

const config = require('./config.js');

// Local Strategy for username and password auth
exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Generate JWT token
exports.getToken = user => {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

// JWT strategy for token auth
const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
    new JwtStrategy(
        opts,
        (jwt_payload, done) => {
            console.log("JWT payload: ", jwt_payload);
        
            User.findOne({_id: jwt_payload._id})
            .then((user) => {
                if(user){
                    return done(null, user);
                }
                else{
                    return done(null, false);
                }
            }).catch((err) => done(err, false));
        }
    )
);
// Middleware to verify the user
exports.verifyUser = passport.authenticate('jwt', {session: false});

// Middleware to verify admin privileges
exports.verifyAdmin = (req, res, next) => {
    if(req.user && req.user.admin) {
        return next(); // proceed if user is admin
    } else {
        const err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err); // send error response if user not an admin
    }
};

// Facebook token strategy
exports.facebookPassport = passport.use(
    new FacebookTokenStrategy(
        {
            clientID: config.facebook.clientId,
            clientSecret: config.facebook.clientSecret,
            session: false
        }, 
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ facebookId: profile.id });

                if (user) {
                    return done(null, user);
                } else {
                    user = new User({
                        username: profile.displayName,
                        facebookId: profile.id,
                        firstname: profile.name.givenName,
                        lastname: profile.name.familyName
                    });

                    await user.save();
                    return done(null, user);
                }
            } catch (err) {
                return done(err, false);
            }
        }
    )
);
