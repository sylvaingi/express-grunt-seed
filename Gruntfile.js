// Generated on 2013-04-02 using generator-webapp 0.1.5
'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-connect-proxy');

    // configurable paths
    var yeomanConfig = {
        client: 'client',
        server: 'server',
        dist: 'dist',
        distClient: '<%= yeoman.dist %>/public'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            coffee: {
                files: ['<%= yeoman.client %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%= yeoman.client %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            express: {
                files: ['<%= yeoman.server %>/{,*/}*.js'],
                tasks: ['express-server', 'livereload']
            },
            livereload: {
                files: [
                    '<%= yeoman.client %>/*.html',
                    '{.tmp,<%= yeoman.client %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.client %>}/scripts/{,*/}*.js',
                    '<%= yeoman.client %>/images/{,*/}*.{png,jpg,jpeg,webp}',
                    '<%= yeoman.server %>/{,*/}*.html'
                ],
                tasks: ['livereload']
            }
        },
        server: {
            script: 'server/app.js'
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            proxies: [
                {
                    context: '/',
                    host: 'localhost',
                    port: 3000
                }
            ],
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            proxySnippet
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'client/test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'dist')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.client %>/scripts/{,*/}*.js',
                '!<%= yeoman.client %>/scripts/vendor/*',
                '<%= yeoman.client %>/test/spec/{,*/}*.js',
                '<%= yeoman.server %>/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        coffee: {
            dist: {
                files: [{
                    // rather than compiling multiple files here you should
                    // require them into your main .coffee file
                    expand: true,
                    cwd: '<%= yeoman.client %>/scripts',
                    src: '*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: '.tmp/spec',
                    src: '*.coffee',
                    dest: '<%= yeoman.client %>/test/spec'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.client %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= yeoman.client %>/images',
                javascriptsDir: '<%= yeoman.client %>/scripts',
                fontsDir: '<%= yeoman.client %>/styles/fonts',
                importPath: '<%= yeoman.client %>/components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/
        uglify: {
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.distClient %>/scripts/{,*/}*.js',
                        '<%= yeoman.distClient %>/styles/{,*/}*.css',
                        '<%= yeoman.distClient %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.distClient %>/styles/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.server %>/views/layout.html',
            options: {
                dest: '<%= yeoman.distClient %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.distClient %>/{,*/}*.html', '<%= yeoman.dist %>/views/{,*/}*.html'],
            css: ['<%= yeoman.distClient %>/styles/{,*/}*.css'],
            options: {
                basedir: '<%= yeoman.distClient %>'
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.client %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.distClient %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.distClient %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.client %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.client %>',
                    src: '*.html',
                    dest: '<%= yeoman.distClient %>'
                },
                {
                    cwd: '<%= yeoman.server %>/views',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>/views'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.client %>',
                    dest: '<%= yeoman.distClient %>',
                    src: [
                        '*.{ico,txt}'
                    ]
                },
                {
                    expand: true,
                    cwd: '<%= yeoman.server %>',
                    src: '**/*',
                    dest: '<%= yeoman.dist %>'
                },
                {
                    src: 'package.json',
                    dest: '<%= yeoman.dist %>/package.json'
                }]
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= yeoman.client %>/scripts/main.js'
            }
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'coffee:dist',
            'compass:server',
            'configureProxies',
            'express-server',
            'livereload-start',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'coffee',
        'compass',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'coffee',
        'compass:dist',
        'useminPrepare',
        'imagemin',
        //'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
