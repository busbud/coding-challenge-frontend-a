/** @jsx React.DOM */
/* jshint quotmark:false */
/* globals React, $, _ */
'use strict';


// The TypeAhead React Component
var TypeAhead = require('./../components/typeahead');


// Global Settings
var SHAKE_DURATION = 500;
var API_DATA = {
  endpoint: '//busbud-napi-prod.global.ssl.fastly.net/search?q={0}',
  min_chars: 2,
  headers: {
    'x-busbud-token': 'GUEST_khVwsXJaQ-KiYFXJnMgyUQ'
  }
};


/**
 * Init the City Search Form
 */
var initCitySearchForm = function() {
  var $form = $(this);
  var $all_typeaheads = $('.react-typeahead', this);
  var all_react_typeaheads = [];

  // Render each TypeAheads
  $all_typeaheads.each(function() {
    var html_options = $(this).data();

    var react_typehead = React.renderComponent(
      <TypeAhead html_options={html_options} api_data={API_DATA} />,
      this
    );

    all_react_typeaheads.push(react_typehead);
  });

  // Attach the React TypeAhead references to the form element
  $form.data('all_react_typeaheads', all_react_typeaheads);

  // Validate the Form
  $form.on('submit', validateCitySearchForm);
};


/**
 * Validate the two TypeAheads in the form
 * @param {{}} e - Event
 */
var validateCitySearchForm = function(e) {
  var $form = $(e.target);
  var all_react_typeaheads = $form.data('all_react_typeaheads');
  var error;
  var i;

  for (i = 0; i < all_react_typeaheads.length; i++) {
    error = all_react_typeaheads[i].validate();

    if (error) {
      e.preventDefault();
      shakeCitySearchForm($form);
      all_react_typeaheads[i].setFocus();
      break;
    }
  }
};


/**
 * Shake the form, if the browser support CSS keyframe animations
 * @param {{}} $form
 */
var shakeCitySearchForm = _.debounce(function($form) {
  $form.addClass('has-error');

  setTimeout(function() {
    $form.removeClass('has-error');
  }, SHAKE_DURATION);
}, SHAKE_DURATION, true);


// Init each City Search Form in the current page
$(document).on('ready', function() {
  $('#city-search-form').each(initCitySearchForm);
});
