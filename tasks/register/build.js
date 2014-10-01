module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('build', [
    'clean:dist',
    'copy:dist',
    'copy:normalize',
    'sass:dev',
    'autoprefixer'
  ]);
};
