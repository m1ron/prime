module.exports = function(grunt) {
    /** Source paths **/
    var components = 'bower_components/';
    var src = {
        root: 'src/',
        html: 'src/',
        css: 'src/css/',
        less: 'src/less/',
        js: 'src/js/',
        img: 'src/img/',
        svg: 'src/svg/',
        favicon: 'src/favicon/',
        fonts: 'src/fonts/',
        video: 'src/video/'
    };

    /** Temp paths **/
    var temp = {
        root: 'temp/',
        html: 'temp/',
        css: 'temp/css/',
        js: 'temp/js/',
        img: 'temp/img/',
        svg: 'temp/svg/',
        favicon: 'temp/favicon/',
        fonts: 'temp/fonts/',
        video: 'temp/video/'
    };

    /** Destination paths **/
    var dist = {
        root: 'dist/',
        html: 'dist/',
        css: 'dist/css/',
        js: 'dist/js/',
        img: 'dist/img/',
        svg: 'dist/svg/',
        favicon: 'dist/favicon/',
        fonts: 'dist/fonts/',
        video: 'dist/video/'
    };

    grunt.initConfig({
        config: {
            src: 'src/',
            temp: 'temp/',
            dist: 'dist/'
        },
        clean: {
            pre: ['**/.DS_Store', dist.root, src.css, src.js + 'vendor'],
            after: [src.js + 'vendor/fastclick.js', src.css + 'content'],
            dist: [dist.js + 'custom.js'],

            temp: [temp.root],
            img: [temp.img, dist.img],
            svg: [temp.svg, dist.svg],
            favicon: [src.favicon + '**/*.*', '!<%= config.src %>/favicon/master.png', dist.favicon]
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: [
                        components + 'html5shiv/dist/html5shiv.min.js',
                        components + 'jquery/dist/jquery.min.js',
                        components + 'jquery/dist/jquery.min.map',
                        components + 'fastclick/lib/fastclick.js',
                        components + 'slick-carousel/slick/slick.min.js',
                        components + 'magnific-popup/dist/jquery.magnific-popup.min.js',
                        components + 'jquery-mask-plugin/dist/jquery.mask.min.js'
                    ],
                    dest: src.js + 'vendor'
                }, {
                    expand: true,
                    flatten: true,
                    src: [
                        components + 'slick-carousel/slick/slick.css',
                        components + 'magnific-popup/dist/magnific-popup.css'
                    ],
                    dest: src.css + 'content'
                }, {
                    expand: true,
                    flatten: true,
                    src: [
                        components + 'normalize-css/normalize.css'
                    ],
                    dest: src.css
                }]
            },
            static: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>',
                    dest: '<%= config.dist %>',
                    src: [
                        'js/{,*/}*.*',
                        'fonts/{,*/}*.*',
                        'video/{,*/}*.*',
                        '{,*/}*.html'
                    ]
                }]
            },
            img_temp: {
                files: [{
                    expand: true,
                    cwd: src.img,
                    src: ['**/*.{png,jpg,gif}'],
                    dest: temp.img
                }]
            },
            img_dist: {
                files: [{
                    expand: true,
                    cwd: temp.img,
                    src: ['**/*.{png,jpg,gif}'],
                    dest: dist.img
                }]
            },
            svg_temp: {
                files: [{
                    expand: true,
                    cwd: src.svg,
                    src: ['**/*.svg'],
                    dest: temp.svg
                }]
            },
            svg_dist: {
                files: [{
                    expand: true,
                    cwd: temp.svg,
                    src: ['**/*.svg', '!sprite/*.svg'],
                    dest: dist.svg
                }]
            },
            favicon_dist: {
                files: [{
                    expand: true,
                    cwd: src.favicon,
                    src: ['**/*.*', '!master.png'],
                    dest: dist.favicon
                }]
            },
        },
        concat: {
            options: {
                separator: '\n\n\n'
            },
            dist: {
                files: [{
                    src: [
                        src.js + 'custom.js',
                        src.js + 'vendor/fastclick.min.js',
                        src.js + 'vendor/slick.min.js',
                        src.js + 'vendor/jquery.magnific-popup.min.js',
                        src.js + 'vendor/jquery.mask.min.js'
                    ],
                    dest: src.js + 'plugins.js'
                }, {
                    src: [
                        src.css + 'vendor/*.min.css'
                    ],
                    dest: src.css + 'plugins.css'
                }]
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: src.css + 'content/*.css',
                    dest: src.css + 'vendor',
                    ext: '.min.css'
                }, {
                    expand: true,
                    flatten: true,
                    src: src.css + 'normalize.css',
                    dest: src.css,
                    ext: '.css'
                }]
            }
        },
        less: {
            dev: {
                options: {
                    paths: [src.less]
                },
                files: [{
                    expand: true,
                    cwd: src.less,
                    src: ['main.less', 'ie.less'],
                    dest: src.css,
                    ext: ".css"
                }]
            }
        },
        postcss: {
            options: {
                map: {
                    inline: false,
                    annotation: src.css + '/maps/'
                },
                processors: [
                    require('postcss-focus'),
                    require('postcss-flexbugs-fixes'),
                    require('autoprefixer')({
                        browsers: ['> 1%', 'last 2 versions', 'ie > 7']
                    }),
                    require('css-mqpacker')({
                        sort: true
                    })
                ]
            },
            dist: {
                src: src.css + 'main.css'
            }
        },

        realFavicon: {
            favicons: {
                src: src.favicon + 'master.png',
                dest: src.favicon,
                options: {
                    iconsPath: src.favicon,
                    html: [],
                    design: {
                        ios: {
                            pictureAspect: 'backgroundAndMargin',
                            backgroundColor: '#2a3356',
                            margin: '18%',
                            assets: {
                                ios6AndPriorIcons: false,
                                ios7AndLaterIcons: false,
                                precomposedIcons: false,
                                declareOnlyDefaultIcon: true
                            }
                        },
                        desktopBrowser: {},
                        windows: {
                            pictureAspect: 'whiteSilhouette',
                            backgroundColor: '#2a3356',
                            onConflict: 'override',
                            assets: {
                                windows80Ie10Tile: false,
                                windows10Ie11EdgeTiles: {
                                    small: false,
                                    medium: true,
                                    big: false,
                                    rectangle: false
                                }
                            }
                        },
                        androidChrome: {
                            pictureAspect: 'noChange',
                            themeColor: '#2a3356',
                            manifest: {
                                name: 'Prime',
                                display: 'standalone',
                                orientation: 'notSet',
                                onConflict: 'override',
                                declared: true
                            },
                            assets: {
                                legacyIcon: false,
                                lowResolutionIcons: false
                            }
                        },
                        safariPinnedTab: {
                            pictureAspect: 'silhouette',
                            themeColor: '#5bbad5'
                        }
                    },
                    settings: {
                        scalingAlgorithm: 'Mitchell',
                        errorOnImageTooSmall: false
                    }
                }
            }
        },

        uglify: {
            options: {
                preserveComments: false
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: src.js + 'vendor',
                    src: 'fastclick.js',
                    dest: src.js + 'vendor',
                    ext: '.min.js'
                }]
            }
        },


        // Compress PNG (PNGquant)
        pngquant: {
            default: {
                files: [{
                    expand: true,
                    cwd: temp.img,
                    src: ['**/*.png'],
                    dest: temp.img
                }]
            },
            favicon: {
                files: [{
                    expand: true,
                    cwd: src.favicon,
                    src: ['**/*.png', '!master.png'],
                    dest: src.favicon
                }]
            }
        },

        // Compress SVG (SVGO)
        svgo: {
            default: {
                files: [{
                    expand: true,
                    cwd: temp.svg,
                    src: ['**/*.svg'],
                    dest: temp.svg
                }]
            },
            favicon: {
                files: [{
                    expand: true,
                    cwd: src.favicon,
                    src: ['**/*.svg'],
                    dest: src.favicon
                }]
            }
        },

        // Generate SVG sprite
        svgstore: {
            options: {
                inheritviewbox: true,
                cleanup: true,
                includeTitleElement: false,
                formatting: {
                    indent_size: 4,
                    wrap_line_length: 0,
                    end_with_newline: true
                }
            },
            default: {
                files: {
                    '<%= config.temp %>svg/sprite.svg': ['<%= config.temp %>svg/sprite/*.svg']
                }
            },
        },

        // Watch for changed files
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: [src.js + "*.js"],
                tasks: ["process"]
            },
            styles: {
                files: [src.less + "**/*.less"],
                tasks: ["process"]
            },
            html: {
                files: [src.html + "*.html"],
                tasks: ["process"]
            },
            img: {
                files: [src.img + "**/*.{png,jpg,gif}"],
                tasks: ["img:process"]
            },
            svg: {
                files: [src.svg + "**/*.svg"],
                tasks: ["svg:process"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");

    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks("grunt-contrib-cssmin");

    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-newer");

    grunt.loadNpmTasks('grunt-real-favicon');

    grunt.loadNpmTasks('grunt-pngquant');

    grunt.loadNpmTasks('grunt-svgo');
    grunt.loadNpmTasks('grunt-svgstore');

    grunt.registerTask("default", ["clean:pre", "less", "postcss", "copy:dev", "uglify:dev", "cssmin", "concat", "clean:after", "copy:static", "copy:favicon_dist", "img", "svg", "clean:dist", "clean:temp", "watch"]);
    grunt.registerTask("process", ["less", "postcss", "newer:copy:static"]);

    grunt.registerTask("images", ["img", "svg"]);

    grunt.registerTask("img", ["clean:img", "copy:img_temp", "pngquant:default", "copy:img_dist"]);
    grunt.registerTask("img:process", ["newer:pngquant:default", "newer:copy:img"]);

    grunt.registerTask("svg", ["clean:svg", "copy:svg_temp", "svgo:default", "svgstore:default", "copy:svg_dist"]);
    grunt.registerTask("svg:process", ["newer:svgo:default", "newer:copy:svg"]);

    grunt.registerTask("favicon", ["clean:favicon", "realFavicon", "svgo:favicon", "pngquant:favicon", "copy:favicon_dist"]);
};
