
/**
 * question.js
 * Model file for the user data
 * https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
 */
var mongoose = require('mongoose');
var vote = require('./vote');


var schema = mongoose.Schema({
    question: [
        {
          lang: {type: String, required: true, lowercase: true, trim: true},
          question: {type: String, required: true, trim: true}
        }
      ],
    type: { type: String, required: true, lowercase: true, trim: true},
    answers: [
      { lang : {type: String, required: true, lowercase: true, trim: true},
        answers:
        {
         id: {type: Number},
         answer: { id: {type: Number} ,answer :{type: String, required: true, trim: true}},
        }
      }
    ],
 	createdAt	 : {type: Date, default: Date.now}, // Fecha de creación
  tags: [
    {
      lang : {type: String, required: true, lowercase: true, trim: true},
      tags : [ {type: String, required: true, lowercase: true, trim: true} ]
      }
    ],
  image: { type: String, required: true, trim: true}
});

// add created date property
//schema.plugin(createdDate);

module.exports = mongoose.model('Question', schema, 'questions');
