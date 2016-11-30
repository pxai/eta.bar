/**
 * middleware/isadmin.js
 * this middleware just checks if the user is admin
 * If the user is not logged in, it will be redirected to home page
 * https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
 */

module.exports = function isLoggedIn (req, res, next) {
    if (!(req.session && req.session.login)) {
        return res.redirect('/');
    }
    next();
}
