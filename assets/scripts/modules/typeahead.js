/** @jsx React.DOM */
/* jshint quotmark:false */
/* globals React, $, _, Modernizr */
'use strict';


// Helper
var strFormat = require('../helpers/stringFormat');


// Global Settings
var DEBOUNCE_AJAX_REQUEST = 300;


// Create the TypeAhead React Component
var TypeAhead = React.createClass({


  /**
   * Init React States
   * @returns {{}}
   */
  getInitialState: function() {
    return {};
  },


  /**
   * Get the trimmed content value of the TextBox
   * @returns {string}
   */
  getValue: function() {
    var textbox = this.refs.textbox;
    return textbox ? textbox.getDOMNode().value.trim() : '';
  },


  /**
   * Set the new City on the TextBox
   * @param {string} [city_id]
   */
  setCity: function(city_id) {
    var suggestions = this.getSuggestions();
    var new_value = this.props.value;
    var city;

    if (city_id) {
      city = _.findWhere(suggestions, {city_id: city_id});
    }

    if (city) {
      new_value = city.full_name;
    }

    this.props.current_city = city;
    this.refs.textbox.getDOMNode().value = new_value;
    this.props.error_message = null;
  },


  /**
   * Get the suggestion from the Ajax Request
   * @returns {Array}
   */
  getSuggestions: function() {
    return this.props._suggestions || [];
  },


  /**
   * Set a new suggestions list
   * @param {{}} suggestions
   */
  setSuggestions: function(suggestions) {
    this.props._suggestions = suggestions;
  },


  /**
   * Get the active suggestion index from all the suggestions
   * @returns {number}
   */
  getActiveSuggestionIndex: function() {
    var active_suggestion_index = -1;

    if (!isNaN(this.props._active_suggestion_index)) {
      active_suggestion_index = this.props._active_suggestion_index;
    }

    return active_suggestion_index;
  },


  /**
   * Set a new active suggestion index and update the corresponding active suggestion object
   * @param {number} active_suggestion_index
   */
  setActiveSuggestionIndex: function(active_suggestion_index) {
    var suggestions = this.getSuggestions();

    this.props._active_suggestion_index = active_suggestion_index;
    this.props.active_suggestion = suggestions[active_suggestion_index];
    this.forceUpdate();
  },


  /**
   * Render the TypeAhead component
   * @returns {XML}
   */
  render: function() {
    var value = this.getValue();
    var options = this.props.html_options;
    var error_msg = this.props.error_message || '';
    var placeholder_polyfill = null;

    if (!Modernizr.input.placeholder) {
      placeholder_polyfill = (
        <span className={options.name + '__placeholder-polyfill'}>
          {options.placeholder}
        </span>
      );
    }

    var container = (
      <div className={options.name} ref="container">
        <label htmlFor={options.inputId} className={options.name + '__label'}>
          <div className={options.name + '__tooltip-container'}>
            <div className={options.name + '__tooltip'}>
              {options.placeholder}
            </div>
            <div className={options.name + '__error-message'}>
              {error_msg}
            </div>
          </div>
          <div className={options.name + '__textbox-container'}>
            <i className={options.name + '__icon ' + options.iconClass}></i>
            {placeholder_polyfill}
            {this.renderTextBox()}
          </div>
        </label>
        {this.renderSuggestions([])}
      </div>
    );

    if (this.props.is_active === true) {
      container.props.className += ' has-focus';
    }

    if (value) {
      container.props.className += ' has-value';
    }

    if (error_msg) {
      container.props.className += ' has-error';
    }

    return container;
  },


  /**
   * Render the TextBox in the main component
   * @returns {XML}
   */
  renderTextBox: function() {
    var options = this.props.html_options;
    var class_name = this.props.html_options.name + '__textbox';

    if (this.state.error) {
      class_name += ' has-error';
    }

    var input = (
      <input placeholder={options.placeholder}
      ref="textbox"
      id={options.inputId}
      type="text"
      tabIndex={options.tabindex}
      autoCorrect="off"
      autoComplete="off"
      spellCheck="false"
      className={class_name}
      onKeyDown={this.checkKeyboardActions}
      onKeyPress={this.findSuggestions}
      onCut={this.findSuggestions}
      onPaste={this.findSuggestions}
      onFocus={this.onFocus}
      onBlur={this.onBlur} />
    );

    if (options.autofocus === 'on') {
      input.props.autoFocus = true;
    }

    return input;
  },


  /**
   * Render the Suggestion DropDown in the main component
   * @returns {XML}
   */
  renderSuggestions: function() {
    var options = this.props.html_options;
    var suggestions = this.getSuggestions();
    var active_suggestion = this.props.active_suggestion;
    var active_city_id = active_suggestion ? active_suggestion.city_id : null;
    var rows = [];
    var self = this;
    var row_is_active;

    _.forEach(suggestions, function(suggestion) {
      row_is_active = active_city_id === suggestion.city_id;
      rows.push(
        self.renderSuggestionRow(suggestion, row_is_active)
      );
    });

    return (
      <ul className={options.name + '__dropdown'}
      onMouseEnter={this.suggestionsMouseOver}
      onMouseLeave={this.suggestionsMouseLeave}>
        {rows}
      </ul>
    );
  },


  /**
   * Render a specific row in the Suggestion DropDown
   * @param {{}} suggestion
   * @param {boolean} is_active
   * @returns {XML}
   */
  renderSuggestionRow: function(suggestion, is_active) {

    return (
      <li key={suggestion.city_id}>
        <a className={is_active ? 'is-active' : ''}
        data-city-id={suggestion.city_id}
        onClick={this.suggestionClick}>
          {suggestion.full_name}
        </a>
      </li>
    );
  },


  /**
   * Mouse Over: When the user is using the Suggestion DropDown with a mouse
   */
  suggestionsMouseOver: function() {

    // Flag to prevent an onBlur event on the TextBox
    this.props.active_dropdown = true;

    // Remove the CSS Class on the previous selected suggestion
    this.setActiveSuggestionIndex(-1);
  },


  /**
   * Mouse Leave: When the user is using the Suggestion DropDown with a mouse
   */
  suggestionsMouseLeave: function() {
    this.props.active_dropdown = false;
  },


  /**
   * The user has clicked on an item in the Suggestion DropDown
   * @param {{}} e - Event
   */
  suggestionClick: function(e) {
    var city_id = $(e.target).data('cityId');

    this.setCity(city_id);
    this.setSuggestions([]);
    this.refs.textbox.getDOMNode().focus();
    this.props.active_dropdown = false;
  },


  /**
   * Process the corresponding behaviour on certain keyboard events
   * @param {{}} e - Event
   */
  checkKeyboardActions: function(e) {
    var key_code = e.which;
    var index = this.getActiveSuggestionIndex();
    var suggestions_length;

    // Backspace and Delete Keys
    if (key_code === 8 || key_code === 46) {
      this.findSuggestions();
      return;
    }

    // Arrows Up and Down Keys
    if (key_code === 38 || key_code === 40) {
      e.preventDefault();
      this.keyboardNavigation(key_code);
      return;
    }

    // Enter Key
    if (key_code === 13 && index !== -1) {
      suggestions_length = this.getSuggestions().length;

      if (suggestions_length) {
        e.preventDefault();
        this.setSuggestions([]);
        this.forceUpdate();
      }
    }
  },


  /**
   * Keyboard navigation in the Suggestions DropDown
   * @param {number} key_code
   */
  keyboardNavigation: function(key_code) {
    var suggestions = this.getSuggestions();
    var index = this.getActiveSuggestionIndex();
    var has_no_suggestion;
    var is_last_suggestion;
    var new_index;

    // Don't try to set the active suggestion if there is no suggestions
    if (!suggestions.length) {
      return;
    }

    // Up key
    if (key_code === 38) {
      has_no_suggestion = index === -1;
      new_index = has_no_suggestion ? suggestions.length - 1 : index - 1;
      this.setActiveSuggestionIndex(new_index);
    }

    // Down key
    if (key_code === 40) {
      is_last_suggestion = index < suggestions.length - 1;
      new_index = is_last_suggestion ? index + 1 : -1;
      this.setActiveSuggestionIndex(new_index);
    }

    // Update the displayed value in the TextBox
    if (new_index === -1) {
      this.setCity();
    } else {
      this.setCity(suggestions[new_index].city_id);
    }
  },


  /**
   * Find new Suggestions according to the values entered by the user
   */
  findSuggestions: _.debounce(function() {
    var value = this.getValue();
    var endpoint_url = this.props.api_data.endpoint;
    var min_chars = this.props.api_data.min_chars;
    var http_headers = this.props.api_data.headers;
    var ajax_request;
    this.props.value = value;

    // The TextBox value has changed, the current city need to be re-validated
    this.props.current_city = null;

    if (value.length >= min_chars) {

      // Prepare the jQuery ajax request
      ajax_request = {
        url: strFormat(endpoint_url, value),
        beforeSend: function(req) {
          for (var header in http_headers) {
            if (http_headers.hasOwnProperty(header)) {
              req.setRequestHeader(header, http_headers[header]);
            }
          }
        }
      };

      $
        .ajax(ajax_request)
        .success(this.processSuggestions);

    } else {
      this.processSuggestions([]);
    }
  }, DEBOUNCE_AJAX_REQUEST),


  /**
   * Process the new Suggestions and update the content of the DropDown
   * @param {Array} suggestions
   */
  processSuggestions: function(suggestions) {
    var value = this.getValue();

    // Update the current city according to the results
    this.props.current_city = _.findWhere(suggestions, {full_name: value});

    this.setActiveSuggestionIndex(-1);
    this.setSuggestions(suggestions);
    this.forceUpdate();
  },


  /**
   * On Focus on the TextBox
   */
  onFocus: function() {
    this.setState({error: false});
    this.props.is_active = true;
  },


  /**
   * Set Focus on the TextBox
   * @returns {*}
   */
  setFocus: function() {
    return this.refs.textbox.getDOMNode().focus();
  },


  /**
   * On Blur on the TextBox
   */
  onBlur: function() {

    // False Flag: the user has just clicked on an item in the DropDown list, and is back on the TextBox
    if (this.props.active_dropdown) {
      return;
    }

    var value = this.getValue();
    var suggestions = this.getSuggestions();

    // Update the value in memory and clean the dropdown
    if (value !== this.props.value) {
      this.props.value = this.getValue();
      this.setSuggestions([]);
      suggestions = [];
    }

    // Remove the active CSS class
    this.props.is_active = false;

    // If needed, reset the active suggestion index
    if (suggestions.length > 0) {
      this.setActiveSuggestionIndex(-1);
    }

    this.forceUpdate();
  },


  /**
   * Validate the content of the TextBox
   * @returns {*}
   */
  validate: function() {
    var value = this.getValue();
    var error = null;
    var required_msg = this.props.html_options.required;
    var invalid_city_msg = this.props.html_options.invalidCity;

    if (!value) {
      error = 'required';
      this.props.error_message = required_msg;
    }

    if (value && !this.props.current_city) {
      error = 'invalid_city';
      this.props.error_message = invalid_city_msg;
    }

    if (!error) {
      this.props.error_message = null;
    }

    this.setState({error: error});
    this.forceUpdate();

    return error;
  }

});


module.exports = TypeAhead;
