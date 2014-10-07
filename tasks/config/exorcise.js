// Move Browserify source maps to a separate file using Exorcist and Grunt
module.exports = function(grunt) {
  'use strict';

  grunt.config.set('exorcise', {
    browserify: {
      files: {
        'dist/scripts/main.js.map': ['dist/scripts/main.js']
      }
    }
  });
};
