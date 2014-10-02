/** @jsx React.DOM */

// Helper
var strFormat = require('../helpers/stringFormat');

// Busbud API settings
var BUSBUD_TOKEN = 'GUEST_khVwsXJaQ-KiYFXJnMgyUQ';
var BUSBUD_CITY_SEARCH_ENDPOINT = 'http://busbud-napi-prod.global.ssl.fastly.net/search?q={0}';

// jQuery ajax request
var ajax_request = {
  beforeSend: function(req) {
    req.setRequestHeader('x-busbud-token', BUSBUD_TOKEN);
  }
};

var Typeahead = React.createClass({

  getInitialState: function() {
    return {};
  },

  getValue: function() {
    return this.refs.textBox.getDOMNode().value.trim();
  },

  setValue: function(value) {
    this.refs.textBox.getDOMNode().value = value;
  },

  getSuggestions: function() {
    return this._suggestions || [];
  },

  setSuggestions: function(suggestions) {
    this._suggestions = suggestions;
  },

  render: function() {
    var options = this.props.options;

    return (
      <label htmlFor="to" className={options.name + ' ' + this.hasFocus + (this.props.isActive === true ? ' has-focus' : '')}>
        <div className={options.name + '__tooltip'}>{options.placeholder}</div>
        <i className={options.name + '__icon ' + options.iconClass}></i>
        {this.renderTextBox()}
        {this.renderSuggestions([])}
      </label>
    );
  },

  renderTextBox: function() {
    var options = this.props.options;

    var className = this.props.options.name + '__textbox';
    if (this.state.error) {
      className += ' has-error';
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
      className={className}
      onKeyUp={this.checkActions}
      onKeyPress={this.findSuggestions}
      onCut={this.findSuggestions}
      onPaste={this.findSuggestions}
      onFocus={this.onFocus}
      onBlur={this.onBlur} />
    );
  },

  renderSuggestions: function() {
    var options = this.props.options;
    var suggestions = this.getSuggestions();
    var rows = [];

    _.forEach(suggestions, function(suggestion) {
      rows.push(
        <li key={suggestion.city_id}>
          <a>{suggestion.full_name}</a>
        </li>
      );
    });

    return (
      <ul className={options.name + '__dropdown'}>
        {rows}
      </ul>
    );
  },

  checkActions: function(e) {
    if (e.which === 8 || e.which === 46) {
      this.findSuggestions();
    }
  },

  findSuggestions: _.debounce(function() {
    var value = this.getValue();

    if (value.length >= 2) {
      ajax_request.url = strFormat(BUSBUD_CITY_SEARCH_ENDPOINT, value);

      $
        .ajax(ajax_request)
        .success(this.updateCityList);

    } else {
      this.updateCityList([]);
    }
  }, 300),

  updateCityList: function(data) {
    this.setSuggestions(data);
    this.forceUpdate();
  },

  onFocus: function() {
    this.setState({error: false});
    this.props.isActive = true;
  },

  onBlur: function() {
    var value = this.getValue();
    var suggestions = this.getSuggestions();
    var error;

    if (this.props.required && !value || value.length < 2) {
      error = 'required';
    }
    this.setState({error: error});

    this.props.isActive = false;

    if (suggestions.length > 0) {
      this.setValue(suggestions[0].full_name);
    }
  }
});

var initTypeaheads = function() {
  var self = this;
  var options = $(self).data();
  React.renderComponent(<Typeahead options={options} />, self);
};

$('.react-typeahead').each(initTypeaheads);
