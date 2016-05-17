'use strict';

var debug          = require('debug')('fundation');
var debugMiddleware = require('debug')('fundation:middleware');
var compression    = require('compression');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var glob           = require("glob");
var path           = require('path');

module.exports = function(app) {

  debug("Setting up Middleware");

  //
  // Compress all requests
  // Adds the following to the "Response Headers"
  //   Content-Encoding: gzip
  //   Transfer-Encoding: chunked
  //   Vary: Accept-Encoding
  //
  app.use(compression());

  //
  // Parse data that is submitted from a <form>
  // console.log(__dirname + '/../uploads');
  //
  app.use(bodyParser.json()); // For parsing application/json
  app.use(bodyParser.urlencoded({
    extended: true // For parsing application/x-www-form-urlencoded
  }));

  //
  // Support for cookies
  //
  app.use(cookieParser());

  var files = glob.sync('middleware/*.js');
  files.forEach(function (file) {
    debugMiddleware('Middleware: ' + file);
    require(path.resolve(file))(app);
  });

};
