module.exports = function(grunt) {
  'use strict';

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load the include-all library in order to require all of our grunt
  // configurations and task registrations dynamically.
  var includeAll = require('include-all');

  /**
   * Loads Grunt configuration modules from the specified
   * relative path. These modules should export a function
   * that, when run, should either load/configure or register
   * a Grunt task.
   */
  function loadTasks(relPath) {
    return includeAll({
        dirname: require('path').resolve(__dirname, relPath),
        filter: /(.+)\.js$/
      }) || {};
  }

  /**
   * Invokes the function from a Grunt configuration module with
   * a single argument - the `grunt` object.
   */
  function invokeConfigFn(tasks) {
    for (var taskName in tasks) {
      if (tasks.hasOwnProperty(taskName)) {
        tasks[taskName](grunt);
      }
    }
  }

  // Load task functions
  var taskConfigurations = loadTasks('./tasks/config');
  var registerDefinitions = loadTasks('./tasks/register');

  // Ensure that a default task exists
  if (!registerDefinitions.default) {
    registerDefinitions.default = function(grunt) {
      grunt.registerTask('default', []);
    };
  }

  // Run task functions to configure Grunt.
  invokeConfigFn(taskConfigurations);
  invokeConfigFn(registerDefinitions);
};
