module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('default', [
    'build',
    'express:dev',
    'watch'
  ]);
};
