// Watches files for changes and runs tasks based on the changed files
module.exports = function(grunt) {
  'use strict';

  grunt.config.set('watch', {
    options: {
      livereload: true
    },
    express: {
      files: [
        'app.js'
      ],
      tasks: [
        'express:dev'
      ]
    },
    grunt: {
      files: [
        'Gruntfile.js',
        'tasks/*/*.js'
      ],
      tasks: [
        'build'
      ]
    },
    views: {
      files: [
        'views/{,*/}*.jade'
      ]
    },
    sass: {
      files: [
        'assets/styles/{,*/}*.scss'
      ],
      tasks: [
        'sass:dev',
        'autoprefixer'
      ]
    },
    js: {
      files: [
        'assets/scripts/{,*/}*.js',
        'app.js',
        'Gruntfile.js',
        'tasks/*/*.js'
      ],
      tasks: [
        'jshint'
      ]
    },
    browserify: {
      files: [
        'assets/scripts/{,*/}*.js'
      ],
      tasks: [
        'browserify:dev'
      ]
    }
  });
};
