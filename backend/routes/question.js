/**
 * routes/question.js
 * The question related page
 * Pello Altadill - http://pello.io
 */
var mongoose = require('mongoose');
var Vote = mongoose.model('Vote');
var sanitize = require('../helpers/sanitize');
var isloggedin = require('../middleware/isloggedin');
var sample = {
  "_id": 1,
  "question": "What is the meaning of life",
  "type": "normal",
  "answers" : [
    {"_id": 1, "answer": "Nothing at all", "votes": 31},
    {"_id": 2, "answer":"42", "votes": 3},
    {"_id": 3, "answer":"Live and let live", "votes": 11},
    {"_id": 4, "answer":"Run for your life", "votes": 16}
  ]
};
module.exports = function (app) {

    app.get('/api/v1/question/last' ,function(req, res) {
        sample.type = "normal";
        res.send(sample);
    });

  app.post('/api/v1/question/vote' ,function(req, res) {
    var vote = new Vote({
        userid: { type: ObjectId, required: true, trim: true},
        questionid: sanitize(req.body.answerid),
        ip: { type: String, required: true, trim: true },
        answerid: sanitize(req.body.answerid)
      });

    vote.validate(function (err) {
      if (err) {
        console.log(err);
        console.log('Validation error! : ' + String(err));
        res.send({title: "Vote", message: 'validation error in vote', "errors": err});
      } else {
        vote.save(function (err, message) {
          if (err) {
            res.send('{"msg":"Message not saved"}');
            return;
          }
          console.log('Saving: ' + vote);
          sample.type = "voted";
          res.send(sample);
        });
      }
    });


  });
}
