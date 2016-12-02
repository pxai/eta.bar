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

}
