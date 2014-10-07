// Minify files with UglifyJS.
module.exports = function(grunt) {
  'use strict';

  grunt.config.set('uglify', {
    dist: {
      options: {
        sourceMap: true,
        sourceMapIn: 'dist/scripts/main.js.map'
      },
      files: {
        'dist/scripts/main.js': ['dist/scripts/main.js']
      }
    }
  });
};
