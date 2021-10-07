const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Bloggers = require("./models/blogger");
const bcrypt = require("bcrypt");


passport.use(new LocalStrategy(function (username, password, done) {
	Bloggers.findOne({ username: username }, async (err, user) => {
		const loginPassword = password;
		if (err) return done(err);
		if (!user) return done(null, false, { message: 'Incorrect username.' });

		if (await bcrypt.compare(loginPassword, user.password)) {
			return done(null, user);
		} else {
		 	return done(null, false, { message: 'Incorrect password.' });
		}
	});
}));

passport.serializeUser(function (user, done) {
	done(null, user._id);
});

passport.deserializeUser(function (id, done) {
	Bloggers.findById(id, function (err, user) {
		done(err, user);
	});
});

exports.initialize = passport.initialize()
exports.session = passport.session()