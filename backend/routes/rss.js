/**
 * routes/rss.js
 * Generates the feed
 * Pello Altadill - http://pello.io
 */
var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var feed = require('../helpers/feed');

module.exports = function (app) {

  app.get('/rss' ,function(req, res) {

    var skip = req.params.skip || 0;
    Question.find({},{question:1, permalink:1, createdAt:1, tags:1},{sort: {createdAt: -1}, limit: 10},
      function(err, questions) {
        if (err) { res.send('{"result":"error"}'); }
        else {
          res.send(feed(questions));
        }
      });

  });
}
