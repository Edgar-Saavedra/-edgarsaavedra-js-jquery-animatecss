const webpackConfig = require('./webpack.config');
module.exports = function(grunt) {
    //require('jit-grunt')(grunt);
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.registerTask('default', 'Log some stuff.', function() {
        grunt.log.write('working');
    });
    grunt.initConfig({
        //see https://github.com/webpack/webpack-with-common-libs/blob/master/package.json
        webpack: {
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            },
            prod: webpackConfig,
            dev: Object.assign({ watch: true }, webpackConfig)
        },
        concat: {
            basic: {
                src: [
                    ,'assets/js/custom/dist/custom.js'
                ],
                dest: 'assets/js/dist/dist.js'
            },
            extras: {
                src: ['node_modules/html5shiv/dist/html5shiv.min.js'
                    , 'node_modules/respond.js/dest/respond.min.js'
                ],
                dest: 'assets/js/dist/ie.js',
            }
        },
        compass: {
            compile: {
                options: {
                    sassDir: "assets/sass/",
                    cssDir: "assets/dist/",
                    outputStyle: "compact"
                }//options
            }//dev
        }, //compass
        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: true,
                    optimization: 2,
                    dumpLineNumbers: "comments",
                    sourceMap: false
                },
                files: {
                    "./assets/dist/style.css": "./assets/less/style.less", // destination file and source file
                    //describe every additional style, in this case an additional css theme
                    //"./assets/css/themes/flatly/style.css": "./assets/less/themes/flatly/style.less", // destination file and source file
                }
            }
        },
        watch: {
            options: {
                //livereload: true,
            },
            sass: {
                //files: ['css_unversioned/sass/**/*.scss'],
                files: ['./assets/sass/**/*.scss'],
                tasks: ['compass:compile']
            }, //sass
            less: {
                files: ['./assets/less/**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            js: {
                files: ["src/**/*"],
                //to run additional tasks
                 tasks: ["webpack:prod"],
                // tasks: ["webpack:build-dev","webpack-dev-server"],
                options: {
                    spawn: false,
                }
            }
        }
    });

};