// Copy files and folders.
module.exports = function(grunt) {
  'use strict';

  grunt.config.set('copy', {
    dist: {
      files: [
        {
          expand: true,
          dot: true,
          cwd: 'assets',
          dest: 'dist',
          src: [
            '*.{ico,txt}',
            'images/{,*/}*.{webp,png,gif,jpg}'
          ]
        }
      ]
    },
    normalize: {
      files: [
        {
          expand: true,
          cwd: 'assets',
          src: 'bower_components/normalize.css/normalize.css',
          dest: 'assets/bower_components/normalize.css/',
          rename: function(dest, src) {
            return dest + src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.')) + '.scss';
          }
        }
      ]
    }
  });
};
