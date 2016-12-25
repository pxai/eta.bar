/**
 * models/index.js
 * All models are here to import all of them just with one command
 * in the main app.js, and by the way we connect to MongoDB
 * Better to use an external config.. I know.
 * https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
 */
var mongoose = require('mongoose');
var config = require('config');
//mongoose.connect('mongodb://localhost/etabar');
mongoose.connect(config.mongoUrl);

exports.User = require('./user');
exports.Vote = require('./vote');
exports.Question = require('./question');
exports.Comment = require('./comment');
