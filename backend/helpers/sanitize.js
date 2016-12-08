/**
 * Created by PELLO_ALTADILL on 08/12/2016.
 */
/**
 * helpers/sanitize.js
 * This helper is intended to apply sanitization to data
 * In this case I'm just cleaning html, but I could add
 * other kind of cleaning procedures as well
 * Pello Altadill - http://pello.io
 */

//var sanitizeHtml = require('sanitize-html');

module.exports = function sanitize (input, tags, attributes) {
  var clean = '';
  if (!tags) { tags = []; }
  if (!attributes) { attributes = []; }

  clean = input;
  //clean = sanitizeHtml(input, {allowedTags: tags, allowedAttributes: attributes});
  // TODO: add other sanitizations

  return clean;
};
