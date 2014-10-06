module.exports = function(grunt) {
  'use strict';

  // TODO: Add SASS to the path on the Heroku environment
  grunt.registerTask('heroku', [
    //'clean:dist',
    'copy:dist',
    'browserify:dev',
    'copy:normalize'
    //'sass:dev',
    //'autoprefixer'
  ]);
};
