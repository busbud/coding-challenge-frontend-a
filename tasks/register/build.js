module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('build', [
    'jshint',
    'scsslint',
    'clean:dist',
    'copy:dist',
    'browserify:dev',
    'copy:normalize',
    'sass:dev',
    'autoprefixer'
  ]);
};
