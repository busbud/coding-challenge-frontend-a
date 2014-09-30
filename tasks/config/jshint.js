// Validate JavaScript files with JSHint.
module.exports = function(grunt) {
  'use strict';

  grunt.config.set('jshint', {
    options: {
      jshintrc: '.jshintrc',
      reporter: require('jshint-stylish')
    },
    all: [
      'app.js',
      'Gruntfile.js',
      'assets/scripts/{,*/}*.js',
      '!assets/scripts/vendor/*',
      'tasks/{,*/}*.js'
    ]
  });
};
