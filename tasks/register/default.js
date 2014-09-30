module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('default', [
    'express:dev',
    'watch'
  ]);
};
