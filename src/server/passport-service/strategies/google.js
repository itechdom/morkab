var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

export default function google({
    passport,
    User,
    clientId,
    clientSecret
}) {
    passport.use(new GoogleStrategy({
            clientID: clientId,
            clientSecret: clientSecret,
            callbackURL: "https://playground-test-itechdom.c9users.io/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            User.findOrCreate({
                googleId: profile.id
            }, function(err, user) {
                return cb(err, user);
            });
        }
    ));
}

