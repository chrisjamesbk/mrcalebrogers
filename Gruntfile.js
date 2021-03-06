module.exports = function(grunt) {
  // Do grunt-related things in here

  // Project configuration.
  grunt.initConfig({
    // import the JSON metadata stored in package.json into the grunt config
    pkg: grunt.file.readJSON('package.json'),
    //jshint: {
    //  // define the files to lint
    //  files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
    //  // configure JSHint (documented at http://www.jshint.com/docs/)
    //  options: {
    //      // more options here if you want to override JSHint defaults
    //    globals: {
    //      jQuery: true,
    //      console: true,
    //      module: true
    //    }
    //  }
    //},
    copyto: {
      stuff: {
        files: [
          {
            cwd: 'bower_components/',
            src: ['**/*.js', '!**/dist/**', '!**/tests/**'],
            dest: '_/js/libs/'
          }
        ],
        options: {
          processContent: function(content, path) {
              // do something with content or return false to abort copy
              return content;
          },
          // array of ignored paths, can be specific files or a glob
          ignore: [
            //'stuffdir/**/*.bak',
            //'stuffdir/dontcopyme.txt',
            // ignore both a directory and it's contents (brace expansion)
            //'stuffdir/somedir{,/**/*}'
          ]
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: false
      },
      build: {
        expand: true, // Enable dynamic expansion
        cwd: '_/js/',
        src: ['**/*.js', '!build/**'],
        dest: '_/js/build',
        ext: '.min.js'
      }
    },
    less: {
        development: {
            options: {
                paths: ["_/less"],
                yuicompress: true
            },
            files: {
                "_/css/style.css": "_/less/style.less"
            }
        }
    },
    connect: {
      options: {
        port: 8443,
        livereload: 35730,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            './'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: './'
        }
      }
    },
    watch: {
        css: {
          files: "_/less/*",
          tasks: ["less"]
        },
        /*
        js: {
          files: '<%= uglify.build.src %>',
          tasks: ['uglify']
        },*/
        livereload: {
          options: {
            livereload: '<%= connect.options.livereload %>'
          },
          files: [
            '*.html',
            '_/css/*.css',
            '_/js/*.js',
            '_/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-copy-to');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'connect:livereload',
      'watch'
    ]);
  });

  // Default task(s).
  // the default tasks can be run just by typing "grunt" on the command line
  grunt.registerTask('default', ['copyto', 'uglify', 'less']);

};
