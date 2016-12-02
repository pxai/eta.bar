/**
 * routes/question.js
 * The question related page
 * Pello Altadill - http://pello.io
 */
var isloggedin = require('../middleware/isloggedin');
var sample = { "question": "What is the meaning of life", "answers" : ["Nothing at all","42","Live and let live","Run for your life"]};
module.exports = function (app) {

    app.get('/question/last' ,function(req, res) {
        res.send(sample);
    });

  app.post('/question/vote' ,function(req, res) {
    /*var beat = new Beat({
      fromUser: req.session.user,
      to: sanitize(req.body.questioid),
      text: sanitize(req.body.voteid)
    });*/
    res.send({"result": "ok"});
  });
}
