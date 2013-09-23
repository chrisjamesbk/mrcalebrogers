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
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: false
      },
      build: {
        expand: true, // Enable dynamic expansion
        cwd: '_/js/',
        src: ['*.js', '!libs/**', '!build/**'],
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
    watch: {
        css: {
          files: "_/less/*",
          tasks: ["less"]
        },
        js: {
          files: '<%= uglify.build.src %>',
          tasks: ['uglify']
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  // the default tasks can be run just by typing "grunt" on the command line
  grunt.registerTask('default', ['less', 'uglify']);

};
