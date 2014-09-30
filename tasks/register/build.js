module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('build', [
    'sass:dev',
    'autoprefixer'
  ]);
};
