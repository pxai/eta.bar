/**
* app.js
* Main entrypoint for the app
* https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
*/
var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var config = require('config');
var mongoose = require('mongoose');
var morgan = require('morgan');
const MongoStore = require('connect-mongo')(expressSession);

const PORT = process.env.PORT || config.port || 5000



var models = require('./models');
var routes = require('./routes');
var middleware = require('./middleware');


var app = express();

app.set('trust proxy', 1);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// If we want to use post data:
app.use(bodyParser.json());
app.use(morgan('combined'));


// For session data:
app.use(expressSession({secret: 'tannedkrab',
            resave: true,
            saveUninitialized: true,
            key: 'session',
            store: new MongoStore({
                    host: config.dbhost,
                    port: config.dbport,
                    db: 'session',
                    url: config.mongoUrl
                })
        }) );

// We set middleware
middleware(app);

// We set routes
routes(app);

// We set static content
app.use(express.static('../dist'));

// And there we go, listening on port 3000
app.listen(PORT, function () {
    console.log('Starting ' + config.appName + '. Now listening on http://localhost:' + PORT + ' dirname: ' + __dirname);
});
