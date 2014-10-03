/** @jsx React.DOM */
/* jshint quotmark:false */
/* globals React, $, _ */
'use strict';


// Helper
var strFormat = require('../helpers/stringFormat');

// Busbud API & Type Ahead Settings
var BUSBUD_TOKEN = 'GUEST_khVwsXJaQ-KiYFXJnMgyUQ';
var BUSBUD_CITY_SEARCH_ENDPOINT = 'http://busbud-napi-prod.global.ssl.fastly.net/search?q={0}';
var DEBOUNCE_AJAX_REQUEST = 300;
var MIN_CHARS_BEFORE_AJAX_REQUEST = 2;

// jQuery ajax request
var ajax_request = {
  beforeSend: function(req) {
    req.setRequestHeader('x-busbud-token', BUSBUD_TOKEN);
  }
};

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
    return this.refs.textBox.getDOMNode().value.trim();
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
    this.refs.textBox.getDOMNode().value = new_value;
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
    var options = this.props.options;

    return (
      <div className={options.name + (this.props.is_active === true ? ' has-focus' : '')}>
        <label htmlFor={options.inputId}>
          <div className={options.name + '__tooltip'}>{options.placeholder}</div>
          <i className={options.name + '__icon ' + options.iconClass}></i>
          {this.renderTextBox()}
        </label>
        {this.renderSuggestions([])}
      </div>
    );
  },

  /**
   * Render the TextBox in the main component
   * @returns {XML}
   */
  renderTextBox: function() {
    var options = this.props.options;
    var class_name = this.props.options.name + '__textbox';

    if (this.state.error) {
      class_name += ' has-error';
    }

    return (
      <input placeholder={options.placeholder}
      ref="textBox"
      id={options.inputId}
      type="text"
      htmlTabindex={options.tabindex}
      htmlAutocorrect="off"
      htmlAutocomplete="off"
      htmlSpellcheck="false"
      className={class_name}
      onKeyDown={this.checkKeyboardActions}
      onKeyPress={this.findSuggestions}
      onCut={this.findSuggestions}
      onPaste={this.findSuggestions}
      onFocus={this.onFocus}
      onBlur={this.onBlur} />
    );
  },

  /**
   * Render the Suggestion DropDown in the main component
   * @returns {XML}
   */
  renderSuggestions: function() {
    var options = this.props.options;
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
    this.refs.textBox.getDOMNode().focus();
    this.props.active_dropdown = false;
  },

  /**
   * Process the corresponding behaviour on certain keyboard events
   * @param {{}} e - Event
   */
  checkKeyboardActions: function(e) {
    var key_code = e.which;
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
    if (key_code === 13) {
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
    this.props.value = value;

    // The TextBox value has changed, the current city need to be re-validated
    this.props.current_city = null;

    if (value.length >= MIN_CHARS_BEFORE_AJAX_REQUEST) {
      ajax_request.url = strFormat(BUSBUD_CITY_SEARCH_ENDPOINT, value);

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

    // Validate the content value
    this.validate();
  },

  /**
   * Validate the content of the TextBox
   */
  validate: function() {
    var value = this.getValue();
    var error;

    if (!value) {
      error = 'required';
    }

    if (value && !this.props.current_city) {
      error = 'invalid_city';
    }

    if (error) {
      console.log(this.props.options.inputId + ':', error);
    }

    this.setState({error: error});
  }
});

var initTypeAheads = function() {
  var options = $(this).data();
  React.renderComponent(<TypeAhead options={options} />, this);
};

$('.react-typeahead').each(initTypeAheads);
