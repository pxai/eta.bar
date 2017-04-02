/**
 * routes/question.js
 * The question related page
 * Pello Altadill - http://pello.io
 */
var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Vote = mongoose.model('Vote');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');
var sanitize = require('../helpers/sanitize');
var isloggedin = require('../middleware/isloggedin');
/*
var question = { "question" :  "What is the meaning of life",
 "type": "normal",
 "answers" : [
 {"_id": 1, "answer": "Nothing at all"},
 {"_id": 2, "answer":"42"},
 {"_id": 3, "answer":"Live and let live"},
 {"_id": 4, "answer":"Run for your life"}
 ],
 "createdAt": new Date()};
 db.
*/
var anonymousUser = new User({userid: "1", name: 'Sample', salt : 'Salty salt', hash: 'superbhash', provider: 'myself', provider_id: "1"});
module.exports = function (app) {

    app.get(['/api/v1/question/last','/api/v1/question/last/:lang'] ,function(req, res) {
      req.session.user =  !req.session.user?anonymousUser:req.session.user;
      let lang = req.params.lang || 'eu';
      console.log('Lang: ' + lang);
      Question.findOne({},{},{sort: {createdAt: -1}},
        function(err, question) {
          if (err) { res.send('{"result":"error"}'); }
          else {
            Comment.find({questionid: question._id}, {}, {sort: {createdAt: -1}, limit: 10},
              function (err, result) {
                if (err) { res.send('{"result":"error"}'); }
                var comments = result || [];
                var session = req.session.authData || null;
                if (session != null) {
                  console.log('RECOVER SESSION DATA!!!');
                } else {
                  console.log('SESSION NULL??');
                  console.log(req.session.authData);
                }
                console.log(question);
                console.log('Loaded comments: ' + comments.length);
                res.send({question: question, comments: comments, session : session});
              });
          }
        });

    });

  app.get(['/api/v1/question/q/:question','/api/v1/question/q/:question/:lang'] ,function(req, res) {
    req.session.user =  !req.session.user?anonymousUser:req.session.user;
    console.log('Question : ' + req.params.question);
    let lang = req.params.lang || 'eu';
    Question.findOne({permalink: req.params.question},{},{sort: {createdAt: -1}},
      function(err, question) {
        if (err) { res.send('{"result":"error"}'); }
        else {
          Comment.find({questionid: question._id}, {}, {sort: {createdAt: 1}, limit: 10},
            function (err, result) {
              if (err) { res.send('{"result":"error"}'); }
              var comments = result || [];
              var session = req.session.authData || null;
              if (session != null) {
                console.log('RECOVER SESSION DATA!!!');
              } else {
                console.log('SESSION NULL??');
                console.log(req.session.authData);
              }
              console.log('Loaded comments: ' + comments.length);
              res.send({question: question, comments: comments, session : session});
            });
        }
      });

  });

  app.post('/api/v1/question/vote' ,function(req, res) {
      var vote = new Vote({
        user: req.session.login,
        questionid: sanitize(req.body.questionid),
        ip: req.ip,
        answerid: sanitize(req.body.answerId)
      });

      var checkCountCondition = (req.session.login!=undefined)?{questionid: vote.questionid, user: vote.user}:{questionid: vote.questionid, ip: req.ip};
      Vote.count( checkCountCondition,
        function(err, count) {
          if (count > 0) {
            console.log('YOU HAVE VOTED!! ip:' + req.ip + ' user:' + req.session.login);
            Vote.aggregate(
              {$match: {questionid: vote.questionid}},
              {$project: {answerid: 1, questionid:1, _id: 0}},
              {$group: { _id:{answerid:"$answerid"}, count: {$sum:1} }},
              {$sort: { answerid: 1}},
              function (err, result) {
                if (err) console.log('No data from votes: ' + err);
                console.log(result);
                res.send(result);
              });

          } else {
            vote.validate(function (err) {
              if (err) {
                console.log(err);
                console.log('Vote validation error! : ' + String(err));
                res.send({title: "Vote", message: 'validation error in vote', "errors": err});
              } else {
                vote.save(function (err, message) {
                  if (err) {
                    console.log('Vote not saved.');
                    console.log(err);
                    res.send({"msg": "Message not saved", "err": err});
                    return;
                  }
                  console.log('Vote saved! ' + vote);
                  //question.type = "voted";

                  Vote.aggregate(
                    {$match: {questionid: vote.questionid}},
                    {$project: {answerid: 1, questionid:1, _id: 0}},
                    {$group: { _id:{answerid:"$answerid"}, count: {$sum:1} }},
                    {$sort: { answerid: 1}},
                    function (err, result) {
                      if (err) console.log('No data from votes: ' + err);
                      console.log(result);
                      res.send(result);
                    });

                  //res.send(sample);
                });
              }
            });
          }
        });

      });

  app.post('/api/v1/question/anonymous/vote' ,function(req, res) {
    var vote = new Vote({
      user: req.session.login,
      questionid: sanitize(req.body.questionid),
      ip: req.ip,
      answerid: sanitize(req.body.answerId)
    });

    Vote.count( {questionid: vote.questionid, ip: ip},
      function(err, count) {
        if (count > 0) {
          console.log('YOU HAVE VOTED ANONYMOUSLY!! ' + req.ip);
          Vote.aggregate(
            {$match: {questionid: vote.questionid}},
            {$project: {answerid: 1, questionid:1, _id: 0}},
            {$group: { _id:{answerid:"$answerid"}, count: {$sum:1} }},
            {$sort: { answerid: 1}},
            function (err, result) {
              if (err) console.log('No data from votes: ' + err);
              console.log(result);
              res.send(result);
            });

        } else {
          vote.validate(function (err) {
            if (err) {
              console.log(err);
              console.log('Vote validation error! : ' + String(err));
              res.send({title: "Vote", message: 'validation error in vote', "errors": err});
            } else {
              vote.save(function (err, message) {
                if (err) {
                  console.log('Vote not saved.');
                  console.log(err);
                  res.send({"msg": "Message not saved", "err": err});
                  return;
                }
                console.log('Vote saved! ' + vote);
                //question.type = "voted";

                Vote.aggregate(
                  {$match: {questionid: vote.questionid}},
                  {$project: {answerid: 1, questionid:1, _id: 0}},
                  {$group: { _id:{answerid:"$answerid"}, count: {$sum:1} }},
                  {$sort: { answerid: 1}},
                  function (err, result) {
                    if (err) console.log('No data from votes: ' + err);
                    console.log(result);
                    res.send(result);
                  });

                //res.send(sample);
              });
            }
          });
        }
      });

  });

    app.post('/api/v1/question/comment' ,function(req, res) {
      var comment = new Comment({
        user: req.session.user,
        questionid: sanitize(req.body.questionid),
        ip: req.ip,
        text: sanitize(req.body.text),
        fatherComment: sanitize(req.body.fatherComment || '0'),
        answerid: sanitize(req.body.answerId)
      });

      comment.validate(function (err) {
        if (err) {
          console.log(err);
          console.log('Comment Validation error! : ' + String(err));
          res.send({title: "Vote", message: 'validation error in comment', "errors": err});
        } else {
          comment.save(function (err, message) {
            if (err) {
              console.log('Comment not saved.');
              console.log(err);
              res.send({"msg":"Comment not saved", "err": err});
              return;
            }
            console.log('Saving: ' + vote);
            res.send(comment);
          });
        }
      });
  });


  app.get(['/api/v1/question/latest/:skip','/api/v1/question/latest/:skip/:lang'] ,function(req, res) {

    var skip = req.params.skip || 0;
    var lang = req.params.lang || 'eu';
    Question.find({},{question:1, permalink:1, createdAt:1},{sort: {createdAt: -1}, limit: 10},
      function(err, questions) {
        if (err) { res.send('{"result":"error"}'); }
        else {
          res.send(questions);
        }
      });

  });
}
