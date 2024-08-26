const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const config = require('./config.js');

// Local Strategy for username and password auth
exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Generate JWT token
exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

// JWT strategy for token auth
const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
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
