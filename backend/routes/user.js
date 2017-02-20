/**
 * routes/user.js
 * The user related pages.
 * Use validate to check if a user is correctly logged
 * https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
 */
var isloggedin = require('../middleware/isloggedin');
var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var CLIENT_ID = '126838648966-q1ijfjc4bhlc60eqnliebiaq9rluklv1.apps.googleusercontent.com';

module.exports = function (app) {

    app.post('/validate' ,function(req, res) {
      var authData = req.body.idClaims;
      var client = new auth.OAuth2(CLIENT_ID, '', '');
      client.verifyIdToken(
        req.body.idToken,
        CLIENT_ID,
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
        function(e, login) {

          if (e) {
            console.log('Validation with Google returned error');
            res.send({valid: false});
          } else {
            var payload = login.getPayload();
            var userid = payload['sub'];

            // If request specified a G Suite domain:
            //var domain = payload['hd'];

            req.session.isLoggedIn = true;
            req.session.user = authData.given_name;
            req.session.login = authData.email;
            req.session.authData = req.body.idClaims;
            console.log('User is Valid (:D)  created user: %s with id', authData.email, userid);

            res.send({valid: true, userid: userid});
          }
        });



    });

  app.get('/logout' ,function(req, res) {
    console.log('Session finished');
    req.session.destroy();
    res.send({session: 'finished'});

  });
    app.get('/open' ,function(req, res) {
        res.render('open' , {title: 'Logged users page'});
    });

   // only for logged users
    app.get('/user',  isloggedin ,function(req, res) {
        res.render('users' , {title: 'Logged users page'});
    });

}
