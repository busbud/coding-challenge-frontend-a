module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('build', [
    'clean:dist',
    'copy:dist',
    'browserify:dev',
    'copy:normalize',
    'sass:dev',
    'autoprefixer'
  ]);
};
