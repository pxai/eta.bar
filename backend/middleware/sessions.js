/**
* sessions.js
* This middleware is needed to pass session values to jade templates
* https://github.com/pello-io/simple-express-mongoose
* Pello Altadill - http://pello.info
*/

module.exports = function sessions (req,res, next) {
        res.locals.session = req.session;
        next();
}