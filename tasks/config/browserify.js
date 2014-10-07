// Grunt task for node-browserify
module.exports = function(grunt) {
  'use strict';

  grunt.config.set('browserify', {
    dev: {
      src: ['assets/scripts/main.js'],
      dest: 'dist/scripts/main.js',
      options: {
        transform: ['browserify-shim', 'reactify'],
        browserifyOptions: {
          debug: true
        }
      }
    }
  });
};
