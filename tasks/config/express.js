// Start an Express.js web server using grunt.js
module.exports = function(grunt) {
  'use strict';

  grunt.config.set('express', {
    dev: {
      options: {
        script: 'app.js',
        port: 5000
      }
    }
  });
};
