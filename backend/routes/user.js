/**
 * routes/user.js
 * The user related pages.
 * Use validate to check if a user is correctly logged
 * https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
 */
var isloggedin = require('../middleware/isloggedin');

module.exports = function (app) {

    app.post('/validate' ,function(req, res) {
      var authData = req.body.idClaims;
      req.session.isLoggedIn = true;
      req.session.user = authData.given_name;
      req.session.login = authData.email;
      console.log('created user: %s', authData.email);
      res.send({valid: true});

    });

    app.get('/open' ,function(req, res) {
        res.render('open' , {title: 'Logged users page'});
    });

   // only for logged users
    app.get('/user',  isloggedin ,function(req, res) {
        res.render('users' , {title: 'Logged users page'});
    });

}
