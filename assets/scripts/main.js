/* jshint unused:false */
'use strict';


// Global Dependencies
var $ = require('jquery');
var _ = require('lodash');
var React = window.React = require('react');


// Makes jQuery.ajaxTransport working correctly on IE8/9
// More info here: http://stackoverflow.com/a/10232313/893357
require('jquery-ajax-hooks-xdr');


// Modules
require('./modules/citySearchForm.js');
