'use strict';

var mongo = require('mongoskin');
var db = mongo.db('localhost:27017/express-seed');

var posts = db.collection('posts');

module.exports = posts;