// Middleware to require auth
const passport = require('passport');

exports = passport.authenticate('local', {session: false});
