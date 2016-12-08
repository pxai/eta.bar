
/**
 * comment.js
 * Model file for comments data
 * https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = mongoose.Schema({
    user: { type: Object, required: true},
    questionid: { type: String, required: true, trim: true },
    ip: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true},
    fatherComment	 : {type: String, default: "0"},
    createdAt	 : {type: Date, default: Date.now} // Fecha de creación
});

// add created date property
//schema.plugin(createdDate);


module.exports = mongoose.model('Comment', schema, 'comments');
