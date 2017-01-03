/**
 * routes/comment.js
 * The comments related page
 * Pello Altadill - http://pello.io
 */
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var sanitize = require('../helpers/sanitize');
var isloggedin = require('../middleware/isloggedin');

var anonymousUser = new User({userid: "1", name: 'Sample', salt : 'Salty salt', hash: 'superbhash', provider: 'myself', provider_id: "1"});
module.exports = function (app) {
// , createdOn: { $lte: new Date(from) }
    app.get('/api/v1/comments/last/:id/:from' ,function(req, res) {
      var questionid = req.params['id'];
      var from = new Date(req.params['from']) || new Date();
      Comment.find({questionid: questionid, createdAt: { $gte: from }}, {}, {sort: {createdAt: -1}, limit: 10},
        function (err, result) {
          if (err) { res.send('{"result":"error"}'); }
          var formatted = { 'result' : 'ok', 'data':[]};
          console.log(from  +  ' > ' + result);

          res.send(result);
        });
    });

  app.get('/api/v1/comments/prev/:id/:from' ,function(req, res) {
    var questionid = req.params['id'];
    var from = new Date(req.params['from']) || new Date();
    Comment.find({questionid: questionid, createdAt: { $lte: from }}, {}, {sort: {createdAt: -1}, limit: 10},
      function (err, result) {
        if (err) { res.send('{"result":"error"}'); }
        var formatted = { 'result' : 'ok', 'data':[]};
        console.log(from  +  ' > ' + result);

        res.send(result);
      });
  });

    app.post('/api/v1/comments/create', function(req, res) {
      req.session.user =  !req.session.user?anonymousUser:req.session.user;
      req.session.login =  !req.session.login?anonymousUser:req.session.login;
      var comment = new Comment({
        user: req.session.login,
        login: req.session.user,
        questionid: sanitize(req.body.questionid),
        ip: req.ip,
        text: sanitize(req.body.text),
        fatherComment: sanitize(req.body.fatherComment || '0')
      });
      console.log('New comment: ' + comment.text + ' from: ' + req.ip);
      comment.validate(function (err) {
        if (err) {
          console.log(err);
          console.log('Comment validation error! : ' + String(err));
          res.send({title: "Comment", message: 'validation error in comment', "errors": err});
        } else {
          comment.save(function (err, message) {
            if (err) {
              console.log('Comment not saved.');
              console.log(err);
              res.send({"msg": "Comment not saved", "err": err});
              return;
            }
            console.log('Saving: ' + comment);
            comment.message = "Comment saved";
            res.send(comment);
          }); // comment.save
        }
      });// validate

    });


}
