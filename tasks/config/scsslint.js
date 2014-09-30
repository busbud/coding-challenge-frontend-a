// Validate JavaScript files with JSHint.
module.exports = function(grunt) {
  'use strict';

  grunt.config.set('scsslint', {
    allFiles: [
      'assets/styles/{,*/}*.scss',
    ],
    options: {
      config: '.scss-lint.yml',
      colorizeOutput: true
    }
  });
};
