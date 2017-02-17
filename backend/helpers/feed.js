/**
 * helpers/feed.js
 * Generates RSS feed for the project
 * Pello Altadill - http://pello.io
 */
var RSS = require('rss');

/* lets create an rss feed */
var feed = new RSS({
  title: 'eta.bar',
  description: 'eta.bar galdeketa eta eztabaida gunea',
  feed_url: 'http://eta.bar/rss',
  site_url: 'http://eta.bar',
  image_url: 'http://eta.bar/assets/icon/android-icon-192x192.png',
  docs: 'http://example.com/rss/docs.html',
  managingEditor: 'Pello Altadill',
  webMaster: 'Pello Altadill',
  copyright: '2017 - (c)left',
  language: 'eu',
  categories: ['Eztabaida','Galdeketa','Euskal Herria'],
  pubDate: 'May 20, 2017 04:00:00 GMT',
  ttl: '60'
});


module.exports = function generateFeed (questions) {

  for (var i = 0; i < questions.length; i++ ) {
    feed.item({
      title:  questions[i].question,
      description: questions[i].question + ' aukeratu erantzuna!',
      url: 'http://eta.bar/#/question/'+ questions[i].permalink, // link to the item
      guid: questions[i].id, // optional - defaults to url
      categories: questions[i].tags, // optional - array of item categories
      author: 'Eta Bar', // optional - defaults to feed author property
      date: questions[i].createdAt, // any format that js Date can parse.
      lat: 33.417974, //optional latitude field for GeoRSS
      long: -111.933231, //optional longitude field for GeoRSS

    });
  }

  return feed.xml();
};
