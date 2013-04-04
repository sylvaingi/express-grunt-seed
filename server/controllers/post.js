'use strict';

var posts = require('../models/posts');

module.exports = function (app) {
    app.get('/post', function (req, res) {
        posts.find({}).toArray(function (err, posts) {
            res.render('posts', { posts: posts });
        });
    });
};
