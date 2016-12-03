/**
 * routes/question.js
 * The question related page
 * Pello Altadill - http://pello.io
 */
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
    /*var beat = new Beat({
      fromUser: req.session.user,
      to: sanitize(req.body.questioid),
      text: sanitize(req.body.voteid)
    });*/
    sample.type = "voted";
    res.send(sample);
  });
}
