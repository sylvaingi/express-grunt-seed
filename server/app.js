'use strict';

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

var controllers = [ 'index', 'user' ];

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('layout', 'layout');
app.engine('html', require('hogan-express'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());

    app.use(express.static(path.join(__dirname, '../client')));
    app.use(express.static(path.join(__dirname, '../.tmp')));

    var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
    app.use(lrSnippet);
    app.set('partials', {lr: 'lr'});
}

if ('production' === app.get('env')) {
    app.use(express.static(path.join(__dirname, 'public')));
}

controllers.forEach(function (controllerName) {
    require('./controllers/' + controllerName)(app);
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
