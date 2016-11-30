/**
 * routes/user.js
 * The user related pages
 * https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
 */
var isloggedin = require('../middleware/isloggedin');

module.exports = function (app) {

    app.get('/open' ,function(req, res) {
        res.render('open' , {title: 'Logged users page'});
    });

   // only for logged users
    app.get('/user',  isloggedin ,function(req, res) {
        res.render('users' , {title: 'Logged users page'});
    });

   // only for admin users
    app.get('/admin', isloggedin , function(req, res) {
        res.render('admin' , {title: 'Admin users page'});
    });

    // only for admin users
    app.get('/account' , function(req, res) {
        res.render('admin' , {title: 'Admin users page'});
    });
}
