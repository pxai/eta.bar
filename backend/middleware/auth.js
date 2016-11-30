
var User = require('../models/user.js'),
	passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

	passport.serializeUser(function(user, done){
		//done(null, user._id);
		done(null, user);
	});

	passport.deserializeUser(function(id, done){
		//User.findById(id, function(err, user){
		User.find({iduser:id}, function(err, user){
			if(err || !user) return done(err, null);
			done(null, user);
		});
	});


module.exports = function(app, options){
// if success and failure redirects aren't specified,
// set some reasonable defaults
		if(!options.successRedirect)
			options.successRedirect = '/account';
		
		if(!options.failureRedirect)
			options.failureRedirect = '/login';
		
		return {
				init: function() {
					var env = app.get('env');
					var config = options.providers;

					// configure Facebook strategy
					passport.use(new FacebookStrategy({
						clientID: config.facebook[env].appId,
						clientSecret: config.facebook[env].appSecret,
						callbackURL: '/auth/facebook/callback',
						}, function(accessToken, refreshToken, profile, done){
							var authId = 'facebook:' + profile.id;
							User.findOne({ authId: authId }, function(err, user){
							if(err) return done(err, null);
							if(user) return done(null, user);
							user = new User({
							authId: authId,
							name: profile.displayName,
							created: Date.now(),
							role: 'customer',
						});

						user.save(function(err){
							if(err) return done(err, null);
							done(null, user);
						});
					   });
					}));

					// Use the GoogleStrategy within Passport.
					//   Strategies in Passport require a `verify` function, which accept
					//   credentials (in this case, an accessToken, refreshToken, and Google
					//   profile), and invoke a callback with a user object.
					passport.use(new GoogleStrategy({
					    clientID: config.google[env].appId,
					    clientSecret: config.google[env].appSecret,
					    callbackURL: "http://localhost:3000/auth/google/callback"
					  },
					  function(accessToken, refreshToken, profile, done) {
					    // asynchronous verification, for effect...
				    process.nextTick(function () {
      
				      // To keep the example simple, the user's Google profile is returned to
				      // represent the logged-in user.  In a typical application, you would want
				      // to associate the Google account with a user record in your database,
				      // and return that user instead.
					console.log(profile);
				      	return done(null, profile);
				    	});
				     }  
				  ));

					app.use(passport.initialize());
					app.use(passport.session());
				},
				registerRoutes: function(){
					// register Facebook routes
					app.get('/auth/facebook', function(req, res, next){
							passport.authenticate('facebook', {
							callbackURL: '/auth/facebook/callback?redirect=' +
							encodeURIComponent(req.query.redirect),
						})(req, res, next);
					});
					app.get('/auth/facebook/callback', passport.authenticate('facebook',
						{ failureRedirect: options.failureRedirect },
							function(req, res){
								// we only get here on successful authentication
								res.redirect(303, req.query.redirect || options.successRedirect);
								}
					));

					app.get('/auth/google',
						 // passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
							passport.authenticate('google', { successRedirect: '/',scope:
								[ 'email', 'profile' ]
							}),
						function(req, res){
							    // The request will be redirected to Google for authentication, so this
							    // function will not be called.
					  });

						// GET /auth/google/callback
						//   Use passport.authenticate() as route middleware to authenticate the
						//   request.  If authentication fails, the user will be redirected back to the
						//   login page.  Otherwise, the primary route function function will be called,
						//   which, in this example, will redirect the user to the home page.
					app.get('/auth/google/callback', 
						  passport.authenticate('google', { failureRedirect: '/login' }),
						  function(req, res) {
						    res.redirect('/');
					  });
				}
		};
};





