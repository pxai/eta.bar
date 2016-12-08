
/**
 * vote.js
 * Model file for the user data
 * https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
 */
var mongoose = require('mongoose');


var schema = mongoose.Schema({
    _id: {type: String },
    userid: { type: String, required: true, trim: true},
    questionid: { type: String, required: true, trim: true },
    ip: { type: String, required: true, trim: true },
    answerid: { type: String, required: true, trim: true},
    votedAt	 : {type: Date, default: Date.now} // Fecha de creación
});

// add created date property
//schema.plugin(createdDate);


module.exports = mongoose.model('Vote', schema, 'votes');
