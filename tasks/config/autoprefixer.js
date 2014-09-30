// Add vendor prefixed styles
module.exports = function(grunt) {
  'use strict';

  grunt.config.set('autoprefixer', {
    options: {
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
    },
    dist: {
      files: [{
        expand: true,
        cwd: 'dist/styles/',
        src: '{,*/}*.css',
        dest: 'dist/styles/'
      }]
    }
  });
};
