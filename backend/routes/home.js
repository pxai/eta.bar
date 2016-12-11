/**
 * routes/home.js
 * The home page, just renders the jade tamplate
 * https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
 */
var isloggedin = require('../middleware/isloggedin');

module.exports = function (app) {

   /* app.get('/auth', function(req, res) {
      return res.redirect('/#/create');
      next();
    });*/

   // only for logged users
    app.get('/user',  isloggedin ,function(req, res) {
        res.render('users' , {title: 'Logged users page'});
    });

   // only for admin users
    app.get('/admin', isloggedin , function(req, res) {
        res.render('admin' , {title: 'Admin users page'});
    });

    // access to signin
    app.get('/signin' , function(req, res) {
        res.render('signin' , {title: 'Multilogin page'});
    });

    // access to local
    app.get('/local' , function(req, res) {
        res.render('signin' , {title: 'Multilogin page'});
    });
}
