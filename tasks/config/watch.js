module.exports = function(grunt) {
  'use strict';

  grunt.config.set('watch', {
    options: {
      livereload: true
    },
    express: {
      files: [
        'app.js',
        'Gruntfile.js',
        'tasks/*/*.js'
      ],
      tasks: ['express:dev']
    },
    views: {
      files: [
        'views/{,*/}*.jade'
      ]
    }
  });
};
