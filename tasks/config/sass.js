// Compiles Sass to CSS and generates necessary files if requested
module.exports = function(grunt) {
  'use strict';

  grunt.config.set('sass', {
    options: {
      loadPath: 'assets/bower_components'
    },
    dev: {
      files: [{
        expand: true,
        cwd: 'assets/styles',
        src: ['{,*/}*.scss'],
        dest: 'dist/styles',
        ext: '.css'
      }]
    },
    prod: {
      files: [{
        style: 'compressed',
        expand: true,
        cwd: 'assets/styles',
        src: ['{,*/}*.scss'],
        dest: 'dist/styles',
        ext: '.css'
      }]
    }
  });
};
