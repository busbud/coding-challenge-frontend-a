/**
 * Replaces each format item in a specified string with the text equivalent of a corresponding object's value.
 *
 * E.g.:
 * stringFormat("{0} in {1}: Population {2}, Area {3} sq. feet", "New York", 2010, "8,175,133", "302.6")
 *
 * The example displays the following output:
 * New York in 2010: Population 8,175,133, Area 302.6 sq. feet
 *
 * @returns {string|void}
 */
module.exports = function() {
  'use strict';
  if (!arguments[0].length) return;
  var str = arguments[0];
  var args = Array.prototype.slice.call(arguments, 0).slice(1);
  return str.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined' ? args[number] : match;
  });
};
