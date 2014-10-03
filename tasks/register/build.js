module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('build', [
    'jshint',
    'clean:dist',
    'copy:dist',
    'browserify:dev',
    'copy:normalize',
    'sass:dev',
    'autoprefixer'
  ]);
};
