/**
 * routes/question.js
 * The question related page
 * Pello Altadill - http://pello.io
 */
var mongoose = require('mongoose');
var Vote = mongoose.model('Vote');
var User = mongoose.model('User');
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
var anonymousUser = new User({userid: "1", name: 'Sample', salt : 'Salty salt', hash: 'superbhash', provider: 'myself', provider_id: "1"});
module.exports = function (app) {

    app.get('/api/v1/comments/last/' ,function(req, res) {
      req.session.user =  !req.session.user?anonymousUser:req.session.user;
        sample.type = "normal";
        res.send(sample);
    });


  });
}
