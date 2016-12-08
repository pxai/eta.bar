
/**
 * question.js
 * Model file for the user data
 * https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
 */
var mongoose = require('mongoose');

var schema = mongoose.Schema({
    question: { type: String, required: true, trim: true},
    type: { type: String, required: true, lowercase: true, trim: true},
    answers: [
     {
       answerid: {type: Number},
       answer: { type: String, required: true, trim: true},
       votes: {type: Number},
       userid: { type: String }
     }
    ],
 	createdAt	 : {type: Date, default: Date.now} // Fecha de creación
});

// add created date property
//schema.plugin(createdDate);

module.exports = mongoose.model('Question', schema, 'questions');
