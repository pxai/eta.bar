/**
* logrequest
* this just logs every request to console
*/

module.exports = function logRequest (req, res, next) {
  console.log('request received: ');
  console.log("["+req.method+"] " + req.url);
  console.log(req.body);
  //console.log(req);
  // and go on... if you don't call next the request will hang
  next();
}
