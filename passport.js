const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('./config');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    
    passport.use(new GoogleStrategy({
        clientID: config.googleId,
        clientSecret: config.googleSecret,
        callbackURL: '/api/auth/oauth/google/callback',
        scope: ['profile', 'email']
    }, function (accessToken, refreshToken, profile, done) {
        // const socialId = profile.id;
        // const nickname = profile.displayName;
        // const profileImageUrl = profile.photos[0].value;
            process.nextTick(function() {
                user = profile;
                return done(null, user);
            });
        // onLoginSuccess('Google', socialId, nickname, profileImageUrl, done);
        }

    ));

    passport.use(new GithubStrategy({
        clientID: config.githubId,
        clientSecret: config.githubSecret,
        callbackURL: '/api/auth/oauth/github/callback'
    }, function (accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                user = profile;
                return done(null, user);
            });
        // onLoginSuccess('Google', socialId, nickname, profileImageUrl, done);
        }

    ));

    passport.use(new FacebookStrategy({
        clientID: config.facebookId,
        clientSecret: config.facebookSecret,
        profileFields: ['id', 'displayName', 'photos'],
        callbackURL: '/api/auth/oauth/facebook/callback'
    }, function (accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                user = profile;
                return done(null, user);
            });
        // onLoginSuccess('Google', socialId, nickname, profileImageUrl, done);
        }

    ));

    function onLoginSuccess(platformName, socialId, nickname, profileImageUrl, done) {
        // userService.findOrCreate(platformName, socialId, nickname, profileImageUrl)
        //     .spread((user, created) => {
        //         if (user.state === 1) {
        //             userService.updateUserToJoinedState(user)
        //                 .then(result => {
        //                     done(null, user);
        //                 })
        //                 .catch(err => {
        //                     done(null, user);
        //                 })
        //         } else {
        //             done(null, user);
        //         }
        //     });
    }

}