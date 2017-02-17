/**
 * routes/index.js
 * All routes are here to import all of them just with one command
 * in the main app.js
 * https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
 */

var home = require('./home');
var user = require('./user');
var question = require('./question');
var comment = require('./comment');
var rss = require('./rss');
module.exports = function (app) {
    home(app);
    user(app);
    question(app);
    comment(app);
    rss(app);
}
