/**
 * middleware/index.js
 * All middleware are here to import all of them just with one command
 * in the main app.js
 * Note that maybe this is not always desirable if you want to apply
 * any other middleware in a different order into app.js file.
 */
var credentials = require('../config/credentials.js');
var sessions = require('./sessions');
var auth;


module.exports = function (app) {
	app.use(sessions);
	auth = require('./auth')(app, {
		providers: credentials.authProviders,
		successRedirect: '/account',
		failureRedirect: '/unauthorized',
	});

	// auth.init() links in Passport middleware:
	auth.init();
	// now we can specify our auth routes:
	auth.registerRoutes();
}

